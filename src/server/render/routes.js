export default currentApp => {
  try {
    return require(`../../client/${currentApp}/routes`).default; // eslint-disable-line
  } catch (e) {
    return false;
  }
};
