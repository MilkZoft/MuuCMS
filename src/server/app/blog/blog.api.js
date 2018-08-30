export default (req, res, next) => {
  function post(query, callback) {
    query.state = 'Active';

    res.blogModel.cms().post({
      query
    }, (cache, result) => callback(cache, result));
  }

  function posts(query, callback) {
    const {
      page = 1,
      language = 'es',
      state = 'Active',
      category = false
    } = query;

    const data = {
      language
    };

    if (category) {
      data.category = category;
    }

    res.blogModel.cms().count(data, total => {
      res.blogModel.cms().posts({
        total,
        page,
        language,
        category,
        state
      }, (cache, result) => callback(cache, result, total));
    });
  }

  function rss(query, callback) {
    const {
      language = 'es',
      state = 'Active'
    } = query;

    res.blogModel.cms().posts({
      total: 10,
      page: 0,
      rss: true,
      language,
      state
    }, (cache, result) => {
      let items = '';

      result.forEach(item => {
        items += `
          <item>
            <title><![CDATA[${item.title}]]></title>
            <link>${req.basePath}/blog/${item.year}/${item.month}/${item.day}/${item.slug}</link>
            <description><![CDATA[${item.content}]]></description>
          </item>
        `;
      });

      const xmlResponse = `<?xml version="1.0" encoding="utf-8"?>
        <rss version="2.0">
          <channel>
            <title>Codejobs</title>
            <link>${res.baseUrl}</link>
            <description>Comparte el conocimiento</description>
            ${items}
          </channel>
        </rss>
      `;

      return callback(false, xmlResponse, result.length, 'xml');
    });
  }

  function search(query, callback) {
    const {
      language = 'en',
      state = 'Active',
      term = ''
    } = query;

    res.blogModel.cms().search({
      language,
      state,
      term
    }, (cache, results) => callback(cache, results));
  }

  // Methods
  res.blogAPI = {
    post,
    posts,
    rss,
    search
  };

  return next();
};
