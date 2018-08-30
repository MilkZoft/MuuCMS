// Utils
import { content } from './object';

/**
 * Returns the insert options
 *
 * @returns {string} HTML
 * @memberof module:lib/utils/options
 */
export function getContentInsertOptionsHTML() {
  return `
    <div>
      <a id="insertAd" class="pointer" title="Insert Ad">
        <i class="fa fa-google"></i>
      </a>
      <a id="insertCode" class="pointer" title="Insert Code">
        <i class="fa fa-code"></i>
      </a>
      <a id="insertMedia" class="pointer" title="Insert Media">
        <i class="fa fa-picture-o"></i>
      </a>
    </div>
  `;
}

/**
 * Returns the hidden options
 *
 * @param {string} field Field
 * @param {object} hiddenElements Hidden Elements
 * @returns {object} Handlebars Options
 */
export function getHiddenOptions(field, hiddenElements) {
  const hiddenOptions = { hash: {} };

  hiddenOptions.hash.id = field;
  hiddenOptions.hash.name = field;
  hiddenOptions.hash.value = hiddenElements[field];

  return hiddenOptions;
}

/**
 * Returns the input options
 *
 * @param {object} schema Schema
 * @param {string} field Field
 * @param {string} errorClass errorClass
 * @param {object} connectedUser connectedUser
 * @param {object} flashData flashData
 * @returns {object} Handlebars Options
 */
export function getInputOptions(schema, field, errorClass, connectedUser, flashData) {
  const inputOptions = { hash: {} };

  inputOptions.hash.id = field;
  inputOptions.hash.class = schema[field].className + errorClass;
  inputOptions.hash.name = field;

  if (field === 'author') {
    inputOptions.hash.value = connectedUser.username;
  }

  if (flashData) {
    inputOptions.hash.value = flashData[field] || '';
  }

  return inputOptions;
}

/**
 * Returns the label options
 *
 * @param {object} schema Schema
 * @param {string} field Field
 * @param {object} __ Content
 * @returns {object} Handlebars Options
 */
export function getLabelOptions(schema, field, __) {
  const labelOptions = { hash: {} };

  labelOptions.hash.for = field;

  if (schema[field].errorMessage) {
    labelOptions.hash.text = `
      ${content(schema[field].label, __)}|${schema[field].errorMessage}
    `;
  } else {
    labelOptions.hash.text = content(schema[field].label, __);
  }

  labelOptions.hash['data-content-key'] = schema[field].label;

  return labelOptions;
}


/**
 * Returns the select options
 *
 * @param {object} schema Schema
 * @param {string} field Field
 * @param {string} errorClass errorClass
 * @param {object} flashData flashData
 * @param {object} __ Content
 * @returns {object} Handlebars Options
 */
export function getSelectOptions(schema, field, errorClass, flashData, __) {
  const selectOptions = { hash: {} };

  selectOptions.hash.id = field;
  selectOptions.hash.class = schema[field].className + errorClass;
  selectOptions.hash.name = field;

  if (schema[field].options) {
    selectOptions.hash.options = content(schema[field].options, __);

    // Flash data for selected options
    if (flashData) {
      selectOptions.hash.selectedOption = flashData[field] || '';
    }
  }

  return selectOptions;
}

/**
 * Returns the submit options
 *
 * @param {object} __ Content
 * @param {string} action action
 * @returns {object} Handlebars Options
 */
export function getSubmitOptions(__, action) {
  const submitOptions = { hash: {} };

  submitOptions.hash.id = 'publish';
  submitOptions.hash.class = 'btn dark';
  submitOptions.hash.name = 'publish';
  submitOptions.hash.value = action === 'updateAction'
    ? content('Dashboard.forms.fields.edit', __)
    : content('Dashboard.forms.fields.save', __);
  submitOptions.hash['data-content-key'] = action === 'updateAction'
    ? 'Dashboard.forms.fields.edit'
    : 'Dashboard.forms.fields.save';

  return submitOptions;
}

/**
 * Returns the textarea options
 *
 * @param {object} schema Schema
 * @param {string} field Field
 * @param {string} errorClass errorClass
 * @param {object} flashData flashData
 * @returns {object} Handlebars Options
 */
export function getTextareaOptions(schema, field, errorClass, flashData) {
  const textareaOptions = { hash: {} };

  textareaOptions.hash.id = field;
  textareaOptions.hash.class = schema[field].className + errorClass;
  textareaOptions.hash.name = field;

  if (flashData) {
    textareaOptions.hash.value = flashData[field] || '';
  }

  return textareaOptions;
}
