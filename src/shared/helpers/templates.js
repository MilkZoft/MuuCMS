// Global vars
let renderOptions = {};
let defaultOptions = {};

export function Templates() {
  /**
   * Sets default templates options
   *
   * @param {object} scope Scope
   * @returns {void} void
   * @name defaultScope
   * @function
   */
  function defaultScope(scope) {
    defaultOptions = scope;
    renderOptions = scope;
  }

  /**
   * Retrieves the template options
   *
   * @param {string} key Key
   * @returns {string} render option
   * @name get
   * @function
   */
  function get(key) {
    let scope;

    if (!key) {
      scope = renderOptions;
      renderOptions = defaultOptions;

      return scope;
    }

    return renderOptions[key] || false;
  }

  /**
   * Set a value in the renderOptions
   *
   * @param {string} key Key
   * @param {mixed} value Value
   * @returns {void} void
   * @name set
   * @function
   */
  function set(key, value) {
    renderOptions[key] = value;
  }

  return {
    defaultScope,
    get,
    set
  };
}

export default (req, res, next) => {
  const { defaultScope, get, set } = Templates();

  res.renderScope = {
    default: defaultScope,
    get,
    set
  };

  return next();
};
