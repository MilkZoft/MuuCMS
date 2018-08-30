// Utils
import { forEach, keys } from '../utils/object';

/**
 * Retrieves all the form attributes
 *
 * @param {object} attrs Attributes
 * @param {string} type Form Type
 * @returns {string} HTML
 */
export function _getAttrs(attrs, type) {
  const elements = keys(attrs);
  let html = '';
  let content = '';
  let i = 0;

  if (type === 'textarea') {
    forEach(elements, attr => {
      i += 1;

      const value = attrs[attr];

      if (attr === 'value' && value !== '') {
        content = value;
      } else if (value !== '') {
        html += i === elements.length - 1 ? `${attr}="${value}"` : `${attr}="${value}" `;
      }
    });

    html += `>${content}</textarea>`;
  } else if (type === 'select') {
    forEach(elements, attr => {
      i += 1;

      const value = attrs[attr];

      if (attr !== 'value' && value !== '') {
        html += i === elements.length - 1 ? `${attr}="${value}" ` : `${attr}="${value}" `;
      }
    });
  } else {
    forEach(attrs, attr => {
      const value = attrs[attr];

      if (value !== '') {
        html += `${attr}="${value}" `;
      }
    });
  }

  return html;
}

/**
 * Retrieves all the select options
 *
 * @param {array} options Select Options
 * @param {object} attrs Attributes
 * @returns {string} HTML
 */
export function _getOptions(options, attrs) {
  let html = '';
  let value;

  forEach(options, option => {
    if (option.indexOf(':') > -1) {
      value = option.substr(0, option.indexOf(':'));
      option = option.substr(option.indexOf(':') + 1);

      let selected = '';

      if (value === attrs.selectedOption) {
        selected = ' selected';
      }

      html += `<option value="${value}"${selected}>${option}</option>`;
    } else {
      html += `<option>${option}</option>`;
    }
  });

  return html;
}


/**
 * Close a form tag
 *
 * @returns {string} HTML
 */
export function closeForm() {
  return '</form>';
}

/**
 * Creates a form input based on passed attributes
 *
 * @param {object} attrs Attributes
 * @returns {string} HTML
 */
export function createInput(attrs) {
  if (!attrs) {
    return '';
  }

  let html = '<input ';
  const { type } = attrs;
  const hasType = attrs.hasOwnProperty('type');
  const hasClass = attrs.hasOwnProperty('class');

  if (!hasType) {
    html += 'type="text" ';
  }

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="input" ';
  }

  html += _getAttrs(attrs);

  html += ' />';

  return html;
}

/**
 * Creates a form label based on passed attributes
 *
 * @param {object} attrs Attributes
 * @param {string} text Label Text
 * @returns {string} HTML
 */
export function createLabel(attrs, text) {
  if (!attrs) {
    return '';
  }

  let html = '<label ';
  const parts = text.split('|');

  html += _getAttrs(attrs);

  if (parts.length > 1) {
    html += `>${parts[0]} <span class="errorMessage">${parts[1]}</label>`;
  } else {
    html += `>${text}</label>`;
  }

  return html;
}

/**
 * Creates a form select based on passed attributes
 *
 * @param {object} attrs Attributes
 * @returns {string} HTML
 */
export function createSelect(attrs) {
  if (!attrs) {
    return '';
  }

  let options;
  const { type } = attrs;
  const hasClass = attrs.hasOwnProperty('class');
  let html = '<select ';

  if (attrs.hasOwnProperty('options')) {
    options = attrs.options.split('|');
    delete attrs.options;
  }

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="select" ';
  }

  html += _getAttrs(attrs, 'select');
  html += '>';
  html += _getOptions(options, attrs);
  html += '</select>';
  html = html.replace(' >', '>');

  return html;
}

/**
 * Creates a form textarea based on passed attributes
 *
 * @param {object} attrs Attributes
 * @returns {string} HTML
 */
export function createTextarea(attrs) {
  if (!attrs) {
    return '';
  }

  const editors = ['content'];

  let html = '<textarea ';
  const { type, value = '' } = attrs;
  const hasClass = attrs.hasOwnProperty('class');

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="textarea"';
  }

  html += _getAttrs(attrs, 'textarea');

  if (editors.includes(attrs.id)) {
    html = `
      <div id="${attrs.id}" class="editor">${value}</div>
    `;
  }

  return html;
}

/**
 * Open a form tag
 *
 * @param {object} attrs Form Attributes
 * @returns {string} HTML
 */
export function openForm(attrs) {
  let html = '<form ';

  html += _getAttrs(attrs);

  html += '>';

  return html;
}
