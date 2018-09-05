// Dependencies
import React from 'react';

// Configuration
import { $baseUrl } from '@configuration';

// Components
import Excerpt from '@ui/Excerpt';

// Utils
import { isDefined, isBrowser } from './is';
import { forEach } from './object';
import { isLanguage } from './i18n';
import { removeHTML } from './string';
import { getLanguage } from './url';

/**
 * Animates the scrollTop
 *
 * @returns {void}
 */
export function animateScrollTop() {
  if (isBrowser()) {
    if (window.scrollY !== 0) {
      setTimeout(() => {
        window.scrollTo(0, window.scrollY - 1000);

        animateScrollTop();
      }, 50);
    }
  }
}

/**
 * Return just the attributes with values
 *
 * @param {object} props Props
 * @returns {object} newProps
 */
export function attrs(props) {
  const newProps = {};

  forEach(props, prop => {
    if (prop) {
      newProps[prop] = props[prop];
    }
  });

  return newProps;
}

export function cx(...classes) {
  return classes.join(' ');
}

/**
 * Gets the first paragraph of each post
 *
 * @param {string} html HTML
 * @returns {string} HTML
 */
export function getFirstParagraph(html, url, getJustTheImage) {
  const paragraphs = html.split(/<p[^>]*>(.*?)<\/p>/).filter(paragraph => paragraph.length > 5);
  const image = paragraphs && paragraphs.length > 0
    ? paragraphs[0]
    : false;
  const firstParagraph = paragraphs && paragraphs.length > 1
    ? paragraphs[1]
    : false;

  const imgRegex = /<img[^>]+src="(.+)"/g;
  const img = imgRegex.exec(image);
  const src = img === null ? '' : img[1].split('"')[0];

  if (image && firstParagraph) {
    return getJustTheImage ? src : <Excerpt src={src} url={url} content={firstParagraph} />;
  } else if (image) {
    return getJustTheImage ? src : <Excerpt src={src} url={url} />;
  }

  return getJustTheImage ? '' : <Excerpt content={firstParagraph} />;
}

export function getPostImage(html) {
  return getFirstParagraph(html, '', true);
}

/**
 * Gets a new state
 *
 * @param {object} state State
 * @param {object} newState New State
 * @returns {object} New State
 */
export function getNewState(state, newState) {
  return Object.assign({}, state, newState);
}

/**
 * Gets the scrollTop
 *
 * @returns {number} scrollTop
 */
export function getScrollTop() {
  if (isBrowser()) {
    return isDefined(window.pageYOffset)
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }

  return false;
}

export function sanitizeMetas(metas) {
  if (metas) {
    return metas.map(meta => {
      if (meta.name && meta.content) {
        return {
          name: meta.name,
          content: removeHTML(meta.content)
        };
      }

      return meta;
    });
  }

  return [];
}

/**
 * Returns true if is the first render
 *
 * @param {array} items Items
 * @returns {boolean} True if is first render
 */
export function isFirstRender(items) {
  return !isDefined(items) || items.length === 0 || Object.keys(items).length === 0;
}

export function isNotEmpty(props, obj) {
  let isEmpty = false;

  props.forEach(prop => {
    if (!obj.hasOwnProperty(prop)) {
      isEmpty = true;
    }
  });

  return !isEmpty;
}

export function mapArrayToParams(params, values, exclude = []) {
  const props = {};

  if (params.length === values.length) {
    params.forEach((param, i) => {
      if (!exclude.includes(param)) {
        props[param] = values[i];
      }
    });
  } else if (isLanguage(values[0])) {
    const [value] = values;

    props.language = value;
  }

  return props;
}

/**
 * Returns true if the user is a valid user and if has specific privilege
 *
 * @param {object} connectedUser Connected User
 * @param {string} userPrivilege User Privilege
 * @returns {bool} True if is valid user
 */
export function isUser(connectedUser, userPrivilege) {
  if (!isDefined(connectedUser)) {
    return false;
  }

  const { username = false, privilege = false } = connectedUser;

  if (userPrivilege) {
    return privilege === userPrivilege;
  }

  return !!username;
}

/**
 * Redirects to a specific url
 *
 * @param {string} url URL
 * @returns {void}
 */
export function redirectTo(url = '/') {
  if (isBrowser()) {
    window.location.href = url;
  }

  return false;
}

/**
 * Sets a css class depends on condition
 *
 * @param {boolean} condition Condition
 * @param {string} className1 First class
 * @param {string} className2 Second class
 * @returns {string} Corresponding className
 */
export function setClass(condition, className1, className2) {
  return condition ? className1 : className2 || '';
}

export function getLink(to, external, baseUrl = false, addLanguage = false) {
  const newTo = to.charAt(0) === '/' ? to.substring(1) : to;

  if (baseUrl) {
    return addLanguage ? `${$baseUrl()}/${getLanguage()}/${to}` : $baseUrl() + to;
  }

  return to === '/' || to.indexOf('http') !== -1 || external ? to : `/${getLanguage()}/${newTo}`;
}
