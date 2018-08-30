// Dependencies
import { minify } from 'html-minifier';

// Utils
import { getImageFormats, getFileFormats } from '@utils/files';
import { isDefined, isUndefined } from '@utils/is';
import { content, exists, forEach } from '@utils/object';
import {
  getContentInsertOptionsHTML,
  getHiddenOptions,
  getInputOptions,
  getLabelOptions,
  getSelectOptions,
  getSubmitOptions,
  getTextareaOptions
} from '../utils/options';

// Helpers
import {
  openForm,
  closeForm,
  createInput,
  createLabel,
  createSelect,
  createTextarea
} from './form';

import { createTable } from './table';

const renderMediaAllowedApps = ['blog'];
const renderSearchDisabledApps = ['configuration'];
const renderButtonDisabledApps = ['configuration'];

/**
 * Creates a form input
 *
 * @param {object} options Handlebars options
 * @param {string} type Form type
 * @returns {string} HTML
 */
export function input(options, type) {
  if (isDefined(type) && type === 'input' && isDefined(options.hash)) {
    return createInput(options.hash);
  } else if (isUndefined(type) && isDefined(options.hash)) {
    return createInput(options.hash);
  }

  return '';
}

/**
 * Creates a form select
 *
 * @param {object} options Handlebars options
 * @param {string} type Form type
 * @returns {string} HTML
 */
export function select(options, type) {
  if (isDefined(type) && type === 'select' && isDefined(options.hash)) {
    return createSelect(options.hash);
  } else if (isUndefined(type) && isDefined(options.hash)) {
    return createSelect(options.hash);
  }

  return '';
}

/**
 * Creates a form submit
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function submit(options) {
  if (isDefined(options.hash)) {
    options.hash.type = 'submit';

    if (!isDefined(options.hash.class)) {
      options.hash.class = 'submit';
    } else {
      options.hash.class += ' submit';
    }

    return createInput(options.hash);
  }

  return '';
}

/**
 * Creates a form textarea
 *
 * @param {object} options Handlebars options
 * @param {string} type Form type
 * @returns {string} HTML
 */
export function textarea(options, type) {
  if (isDefined(type) && type === 'textarea' && isDefined(options.hash)) {
    return createTextarea(options.hash);
  } else if (isUndefined(type) && isDefined(options.hash)) {
    return createTextarea(options.hash);
  }

  return '';
}

/**
 * Creates a form label
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function label(options) {
  if (isDefined(options.hash)) {
    return createLabel(options.hash, options.hash.text ? options.hash.text : '');
  }

  return '';
}

/**
 * Creates a form token
 *
 * @param {string} securityToken Security Token
 * @returns {string} HTML
 */
export function token(securityToken) {
  const options = {};

  if (isDefined(securityToken)) {
    options.type = 'hidden';
    options.name = 'securityToken';
    options.value = securityToken;

    return createInput(options);
  }

  return '';
}

/**
 * Renders the form elements
 *
 * @param {object} schema Schema
 * @param {object} __ Content
 * @param {string} field Field
 * @param {string} errorClass Error Class
 * @param {object} userInfo User Info
 * @param {object} flashData Flash Data
 * @returns {string} HTML
 */
export function _renderFormElements(schema, __, field, errorClass, userInfo, flashData) {
  let html = `<div id="${field}Block" class="inputBlock">`;

  html += label(getLabelOptions(schema, field, __));

  if (field === 'content') {
    html += getContentInsertOptionsHTML();
  }

  html += `<p class="${field}">`;

  html += input(
    getInputOptions(schema, field, errorClass, userInfo, flashData),
    schema[field].type
  );
  html += textarea(getTextareaOptions(schema, field, errorClass, flashData), schema[field].type);
  html += select(getSelectOptions(schema, field, errorClass, flashData, __), schema[field].type);

  html += '</p>';
  html += '</div>';

  return html;
}

/**
 * Creates a form checkbox
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function checkbox(options) {
  if (isDefined(options.hash)) {
    options.hash.type = 'checkbox';

    return createInput(options.hash);
  }

  return false;
}

/**
 * Compress the HTML Output
 *
 * @param {object} content Handlebars content
 * @returns {string} Compressed HTML
 */
export function compress(content) {
  return minify(content.fn(this), {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true
  });
}

/**
 * Creates a form email
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function email(options) {
  if (isDefined(options.hash)) {
    options.hash.id = 'email';
    options.hash.type = 'email';
    options.hash.name = 'email';
    options.hash.maxlength = '80';
    options.hash.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';

    return createInput(options.hash);
  }

  return false;
}

/**
 * Returns a flash value
 *
 * @param {string} value Flash Value
 * @returns {string} value
 */
export function flash(value) {
  return value || '';
}

/**
 * Creates a form hidden
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function hidden(options) {
  if (isDefined(options.hash)) {
    options.hash.type = 'hidden';

    return createInput(options.hash);
  }

  return false;
}

/**
 * Returns a Font Awesome icon
 *
 * @param {string} icon FA Icon
 * @returns {string} HTML
 */
export function icon(icon) {
  return `<i class="fa fa-${icon}"></i>`;
}

/**
 * Creates a form password
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function password(options) {
  if (isDefined(options.hash)) {
    options.hash.id = 'password';
    options.hash.type = 'password';
    options.hash.name = 'password';

    return createInput(options.hash);
  }

  return '';
}

/**
 * Creates a form radio
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function radio(options) {
  if (isDefined(options.hash)) {
    options.hash.type = 'radio';

    return createInput(options.hash);
  }

  return '';
}

/**
 * Renders the media form
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function renderMedia(options) {
  const { hash: { __, media, basePath, currentDashboardApp } } = options;
  let icon;
  let html = '';

  if (!renderMediaAllowedApps.includes(currentDashboardApp)) {
    return html;
  }

  html = openForm({
    id: 'mediaForm',
    action: `${basePath}/dashboard/media/upload`,
    method: 'post',
    enctype: 'multipart/form-data'
  });

  html += `
    <div id="media" class="media hidden">
      <div class="bodyMedia">
        <h2 data-content-key="Dashboard.media.title">${content('Dashboard.media.title', __)}</h2>
        <a
          class="closeMedia"
          id="closeMedia"
          title="${content('Dashboard.media.close', __)}"
          data-content-key="Dashboard.media.close"
        >
          <i class="fa fa-times"></i>
        </a>

        <div class="uploadForm">
          <input id="files" name="myFile" type="file">
          <input
            id="uploadFileBtn"
            name="upload"
            class="btn primary"
            value="${content('Dashboard.media.upload.submit', __)}"
            type="submit"
            data-content-key="Dashboard.media.upload.submit"
          />
        </div>

        <div class="searchMedia">
          <input
            id="searchMedia"
            type="text"
            placeholder="${content('Dashboard.media.upload.search.placeholder', __)}"
            data-content-key="Dashboard.media.upload.search.placeholder"
          />
        </div>

        <div class="files">
  `;

  const imageFormats = getImageFormats();
  const documentFormats = getFileFormats();
  let isImage;

  forEach(media, file => {
    if (!file) {
      return false;
    }

    const paths = file.url.split('/');
    const imageUrl = paths[paths.length - 1];
    const extension = imageUrl.split('.').pop();
    const name = imageUrl;

    isImage = exists(extension, imageFormats);

    if (isImage && extension) {
      html += `
        <div class="file" style="background-image: url(${file.url})" title="${name}">
          <div class="options">
            <a
              data-type="${isImage ? 'image' : 'document'}"
              data-filename="${name}"
              data-url="${file.url}"
              class="insert"
              data-content-key="Dashboard.media.insert"
            >
              ${content('Dashboard.media.insert', __)}
            </a>
            <a target="_blank" href="${file.url}" class="download" data-content-key="Dashboard.media.download">
              ${content('Dashboard.media.download', __)}
            </a>
          </div>
        </div>
      `;
    } else if (extension) {
      if (documentFormats[extension]) {
        icon = `fa-file-${documentFormats[extension]}-o`;
      } else {
        icon = 'fa-file-text-o';
      }

      html += `
        <div class="file" title="${name}">
          <i class="fa ${icon} ${documentFormats[extension]}"></i>

          <p>
            ${name}
          </p>

          <div class="options">
            <a
              data-type="${isImage ? 'image' : 'document'}"
              data-filename="${name}"
              data-url="${file}"
              class="insert"
              data-content-key="Dashboard.media.insert"
            >
              ${content('Dashboard.media.insert', __)}
            </a>
            <a
              target="_blank"
              href="${file}"
              class="download"
              data-content-key="Dashboard.media.download"
            >
              ${content('Dashboard.media.download', __)}
            </a>
          </div>
        </div>
      `;
    }
  });

  html += '</div></div>';

  html += closeForm();

  return html;
}

/**
 * Renders the schema form
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function renderSchema(options) {
  const {
    hash: {
      __,
      basePath,
      action,
      connectedUser,
      currentDashboardApp,
      flashData,
      securityToken,
      schema
    }
  } = options;

  const alert = schema && schema.alert || false;
  const hiddenElements = schema && schema.hiddenElements || {};

  let html = openForm({
    action: `${basePath}/dashboard/${currentDashboardApp}/create`,
    method: 'post'
  });

  if (alert) {
    html += `<div class="alert ${alert.type}">${icon(alert.icon)} ${alert.message}</div>`;
  }

  forEach(schema, field => {
    if (schema[field].render) {
      if (!exists(field, hiddenElements)) {
        const errorClass = schema[field].errorMessage ? ' errorBorder' : '';

        html += _renderFormElements(schema, __, field, errorClass, connectedUser, flashData);
      } else {
        html += hidden(getHiddenOptions(field, hiddenElements));
      }
    }
  });

  html += submit(getSubmitOptions(__, action));
  html += token(securityToken);
  html += closeForm();

  return html;
}

export function renderBackupLink(options) {
  const {
    hash: {
      __,
      currentDashboardApp,
      baseUrl
    }
  } = options;

  let html = '';

  if (currentDashboardApp !== 'content') {
    return html;
  }

  html = `
    <p class="backupLink">
      <a
          href="${baseUrl}/content/content.sql"
          title="${content('Dashboard.modules.content.backup', __)}"
          target="_blank"
          data-content-key="Dashboard.modules.content.backup"
      >
          ${icon('database')} ${content('Dashboard.modules.content.backup', __)}
      </a>
    </p>
  `;

  return html;
}

export function renderCreateButton(options) {
  const {
    hash: {
      __,
      currentDashboardApp,
      basePath
    }
  } = options;

  let html = '';

  if (renderButtonDisabledApps.includes(currentDashboardApp)) {
    return html;
  }

  html = `
    <p>
      <a
        href="${basePath}/dashboard/${currentDashboardApp}/create"
        title="${content(`Dashboard.modules.${currentDashboardApp}.create`, __)}"
        data-content-key="Dashboard.modules.${currentDashboardApp}.create"
        class="btn primary"
      >
          ${icon('plus')} ${content(`Dashboard.modules.${currentDashboardApp}.create`, __)}
      </a>
    </p>
  `;

  return html;
}

/**
 * Renders the search form
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function renderSearch(options) {
  const {
    hash: {
      __,
      currentDashboardApp,
      basePath,
      searching
    }
  } = options;

  let form = '';

  if (renderSearchDisabledApps.includes(currentDashboardApp)) {
    return form;
  }

  const inputOptions = {
    id: 'search',
    name: 'search',
    placeholder: content('Dashboard.search.placeholder', __),
    contentKey: 'Dashboard.search.placeholder',
    maxlength: 35
  };

  const submitOptions = {
    hash: {
      id: 'submitSearch',
      name: 'searchSubmit',
      value: content('Dashboard.search.label', __),
      contentKey: 'Dashboard.search.label',
      class: 'btn dark'
    }
  };

  const formOptions = {
    action: `${basePath}/dashboard/${currentDashboardApp}`,
    method: 'post',
    class: 'search'
  };

  form = openForm(formOptions);

  form += createInput(inputOptions);
  form += submit(submitOptions);

  if (searching) {
    form += `
      <div class="searching">
        <strong data-content-key="Dashboard.search.searching">${content('Dashboard.search.searching', __)}:</strong>
        ${searching}
        <a href="${formOptions.action}">${icon('times')}</a>
      </div>
    `;
  }

  form += closeForm();

  return form;
}

/**
 * Renders the results table
 *
 * @param {object} options Handlebars options
 * @returns {string} HTML
 */
export function renderTable(options) {
  const { hash: { tableSchema } } = options;

  if (tableSchema) {
    return createTable(tableSchema);
  }

  return false;
}
