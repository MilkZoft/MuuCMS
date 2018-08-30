export default currentApp => {
  try {
    return require(`../../client/${currentApp}/reducer`).default; // eslint-disable-line
  } catch (e) {
    return false;
  }
};
