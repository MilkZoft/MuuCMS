export default (req, res) => ({
  content: {
    __: JSON.stringify(res.__)
  },
  device: {
    isMobile: res.isMobile
  },
  req: {
    basePath: req.basePath,
    params: req.params,
    query: req.query,
    url: req.url
  }
});
