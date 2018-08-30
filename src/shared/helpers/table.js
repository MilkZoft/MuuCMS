// Utils
import { isDefined } from '../utils/is';
import { content, exists, forEach } from '../utils/object';

// Helpers
import { openForm, closeForm } from './form';
import { icon, submit } from './handlebars';

const ignoredFields = ['language'];
const specialApps = ['configuration'];

/**
 * Render the TBody
 *
 * @param {array} data Data
 * @param {object} fields Fields
 * @param {string} basePath basePath
 * @param {string} currentDashboardApp currentDashboardApp
 * @param {object} __ Content
 * @returns {string} HTML
 */
export function _getTBody(data, fields, basePath, currentDashboardApp, __) {
  const dashboardUrl = `${basePath}/dashboard/${currentDashboardApp}`;
  let deleteAction;
  let html;
  let id;
  let remove;
  let restore;
  let update;
  let deleteIcon = '';

  html = '<tbody>';

  forEach(data, row => {
    let firstField = true;

    // If has a specific background...
    const { bg = '' } = row;
    delete row.bg;

    html += `<tr class="${bg}">`;

    forEach(row, field => {
      let className = 'row';

      if (field === 'id') {
        id = row[field];
      }

      if (firstField) {
        html += `
          <td class="center">
            <input class="tableCheckbox" type="checkbox" name="rows" value="${id}" />
          </td>
        `;

        firstField = false;
      }

      // Icons for state
      restore = '';
      remove = icon('trash');
      deleteAction = 'delete';
      update = icon('pencil');

      if (isDefined(fields[field]) && fields[field].center) {
        className = 'center';
      }

      if (field === 'state' && row[field] === 'Deleted') {
        restore = icon('undo');
        remove = icon('times');
        deleteAction = 'remove';
        update = '';

        // Translating the state...
        row[field] = content(`Dashboard.table.${row[field].toLowerCase()}`, __);
      }

      if (field === 'title' || field === 'name' && isDefined(row.language)) {
        row[field] = `<span class="flag ${row.language}"></span> &nbsp;&nbsp; ${row[field]}`;
      }

      if (!exists(field, ignoredFields)) {
        html += `<td class="${className}" data-column="${fields[field].key}">${row[field]}</td>`;
      }
    });

    deleteIcon = `
      <a
        class="${deleteAction}"
        title="${content('Dashboard.table.delete', __)}"
        data-content-key="Dashboard.table.delete"
        href="${dashboardUrl}/${deleteAction}/${id}"
      >${remove}</a>
    `;

    if (exists(currentDashboardApp, specialApps)) {
      deleteIcon = '';
    }

    html += `
      <td class="center actions">
        <a
          data-content-key="Dashboard.table.edit"
          title="${content('Dashboard.table.edit', __)}"
          class="edit"
          href="${dashboardUrl}/update/${id}">${update}</a>
        ${!restore ? '&nbsp;' : ''}
        ${deleteIcon}
        ${restore ? '&nbsp;' : ''}
        <a
          data-content-key="Dashboard.table.restore"
          title="${content('Dashboard.table.restore', __)}"
          class="restore"
          href="${dashboardUrl}/restore/${id}">${restore}</a>
      </td>
      </tr></tr>
    `;
  });

  html += '</tbody>';

  return html;
}

/**
 * Render the THead
 *
 * @param {object} fields Fields
 * @param {object} __ Content
 * @returns {string} HTML
 */
export function _getTHead(fields, __) {
  let html;

  html = '<thead><tr><th><input class="tableCheckboxAll" type="checkbox" /></th>';

  forEach(fields, field => {
    let className = 'row';

    if (isDefined(fields[field]) && fields[field].center) {
      className = 'center';
    }

    if (!exists(field, ignoredFields)) {
      html += `<th class="${className}" data-column="${fields[field].key}">${fields[field].label}</th>`;
    }
  });

  html += `
    <th class="center" data-content-key="Dashboard.table.action">
      ${content('Dashboard.table.action', __)}
    </th>
    </tr></thead>
  `;

  return html;
}

export function _getCaption(caption, total) {
  const html = `
    <caption>
      <div class="caption">${caption}</div>
      <div class="total"><i class="fa fa-database" aria-hidden="true"></i> ${total || ''}</div>
    </caption>
  `;

  return html;
}

/**
 * Create a table
 *
 * @param {object} tableSchema Table Schema
 * @returns {string} HTML
 */
export function createTable(tableSchema) {
  const {
    __,
    currentDashboardApp,
    basePath,
    theme = 'grey',
    fields,
    data,
    total
  } = tableSchema;

  const deleteOptions = {
    hash: {
      id: 'deleteAction',
      name: 'deleteAction',
      value: content('Dashboard.table.delete', __),
      class: 'btn dark',
      onclick: `return confirm('${content('Dashboard.table.actions.delete.question', __)}')`,
      'data-content-key': 'Dashboard.table.delete|Dashboard.table.actions.delete.question'
    }
  };

  const removeOptions = {
    hash: {
      id: 'removeAction',
      name: 'removeAction',
      value: content('Dashboard.table.remove', __),
      class: 'btn danger',
      onclick: `return confirm('${content('Dashboard.table.actions.remove.question', __)}')`,
      'data-content-key': 'Dashboard.table.remove|Dashboard.table.actions.remove.question'
    }
  };

  const restoreOptions = {
    hash: {
      id: 'restoreAction',
      name: 'restoreAction',
      value: content('Dashboard.table.restore', __),
      class: 'btn success',
      onclick: `return confirm('${content('Dashboard.table.actions.restore.question', __)}')`,
      'data-content-key': 'Dashboard.table.restore|Dashboard.table.actions.restore.question'
    }
  };

  let html = openForm({
    action: `${basePath}/dashboard/${currentDashboardApp}`,
    method: 'post',
    class: 'results'
  });

  if (data.length > 0) {
    html += `<table class="table ${theme}">`;
    html += _getCaption(currentDashboardApp, total);
    html += _getTHead(fields, __);
    html += _getTBody(data, fields, basePath, currentDashboardApp, __);
    html += '</table>';
  } else {
    html += `<div class="noData" data-content-key="Dashboard.table.noData">${content('Dashboard.table.noData', __)}</div>`;
  }

  if (!exists(currentDashboardApp, specialApps)) {
    html += `
      <div class="actions">
        ${submit(deleteOptions)}
        ${submit(removeOptions)}
        ${submit(restoreOptions)}
      </div>
    `;
  }

  html += closeForm();

  return html;
}
