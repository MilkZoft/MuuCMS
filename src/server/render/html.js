import serialize from 'serialize-javascript';

export default function html(options) {
  const {
    markup,
    initialState,
    currentApp,
    isNotLocal,
    helmet
  } = options;

  const stylesheet = `/css/${currentApp}.css`;
  const link = isNotLocal ? `<link rel="stylesheet" href="${stylesheet}" />` : '';

  const analytics = isNotLocal ? `
    <script type="text/javascript">
      const sc_project = 11777699;
      const sc_invisible = 1;
      const sc_security = "1b61df6c";
    </script>

    <script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script>
    <noscript>
      <div class="statcounter">
        <a rel="nofollow" title="Web Analytics Made Easy - StatCounter" href="http://statcounter.com/" target="_blank">
          <img class="statcounter" src="//c.statcounter.com/11777699/0/1b61df6c/1/" alt="Web Analytics Made Easy - StatCounter" />
        </a>
      </div>
    </noscript>
  ` : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
        <title>Codejobs - Blog</title>
        ${helmet ? helmet.title.toString() : ''}
        ${helmet ? helmet.meta.toString() : ''}
        ${link}
        <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon">
      </head>
      <body>
        <div id="root">${markup}</div>

        <script>
          window.initialState = ${serialize(initialState)};
        </script>
        <script src="/app/vendor.bundle.js"></script>
        <script src="/app/${currentApp}.bundle.js"></script>

        ${analytics}
      </body>
    </html>
  `;
}
