// Utils
import { currentHour } from '@utils/date';

// Configuration
import common from './common.json';
import app from './app.json';
import local from './local.json';
import qa from './qa.json';
import stage from './stage.json';
import production from './production.json';
import test from './test.json';

// Config container
let config;

const envConfigurations = {
  local: { ...local, ...common, ...app, cache: { ...common.cache, ...local.cache } },
  qa: { ...qa, ...common, ...app, cache: { ...common.cache, ...qa.cache } },
  stage: { ...stage, ...common, ...app, cache: { ...common.cache, ...stage.cache } },
  production: { ...production, ...common, ...app, cache: { ...common.cache, ...production.cache } },
  test: { ...test, ...common, ...app, cache: { ...common.cache, ...test.cache } },
};

let currentEnv = 'local';

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  currentEnv = process.env.NODE_ENV;
}

export function $getEnvironment() {
  return currentEnv;
}

export function $isTest() {
  return $getEnvironment() === 'test';
}

export function $isDevelopment() {
  return $getEnvironment() === 'development';
}

export function $isLocal() {
  return $getEnvironment() === 'local';
}

export function $isQA() {
  return $getEnvironment() === 'qa';
}

export function $isStage() {
  return $getEnvironment() === 'stage';
}

export function $isProduction() {
  return $getEnvironment() === 'production';
}

/**
 * Returns the selected environment configuration
 *
 * @returns {object} Config
 */
export function $config() {
  if (!config) {
    config = envConfigurations[currentEnv];
  }

  return config;
}

/**
 * Returns api node
 *
 * @returns {string} api
 */
export function $api() {
  return $config().api;
}

/**
 * Returns app node
 *
 * @returns {string} app
 */
export function $app() {
  return $config().app;
}

/**
 * Returns appName node
 *
 * @returns {string} appName
 */
export function $appName() {
  return $config().appName;
}

/**
 * Returns aws node
 *
 * @returns {string} aws
 */
export function $aws() {
  return $config().aws;
}

/**
 * Returns baseUrl node
 *
 * @returns {string} baseUrl
 */
export function $baseUrl() {
  return $config().baseUrl;
}

/**
 * Returns buffer node
 *
 * @returns {string} baseUrl
 */
export function $buffer() {
  return $config().buffer;
}

/**
 * Returns cache node
 *
 * @returns {object} cache
 */
export function $cache() {
  return $config().cache;
}

/**
 * Returns dashboard node
 *
 * @returns {string} dashboard
 */
export function $dashboard() {
  return $config().dashboard;
}

/**
 * Returns db node
 *
 * @returns {object} db
 */
export function $db() {
  return $config().db;
}

/**
 * Returns languages node
 *
 * @returns {object} languages
 */
export function $languages() {
  return $config().languages;
}

/**
 * Returns security node
 *
 * @returns {object} security
 */
export function $security() {
  return $config().security;
}

/**
 * Returns serverPort node
 *
 * @returns {number} serverPort
 */
export function $serverPort() {
  return $config().serverPort;
}

/**
 * Returns session node
 *
 * @returns {object} session
 */
export function $session() {
  return $config().session;
}

/**
 * Returns social node
 *
 * @returns {object} social
 */
export function $social() {
  return $config().social;
}

/**
 * Returns views node
 *
 * @returns {object} views
 */
export function $views() {
  return $config().views;
}

export function $theme() {
  const hours = currentHour();

  if (hours <= 7 || hours >= 20) {
    return 'darkMode';
  } else {
    return 'lightMode';
  }
}
