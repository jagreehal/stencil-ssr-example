const stencil = require('./dist/hydrate');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3030;

async function serverRenderer(req, res, next) {
  const renderedHtml = await stencil.renderToString(
    `<page-1 first="jag" last="reehal" data-from-server="from SERVER" initial-count=2 todos='[{"title":"wake up"},{"title":"coffee"}]'>
      <div style="color:hotpink">Slotted Content</div>
    </page-1>
    <page-2></page-2>
    <page-1 first="bruce" last="wayne">
    </page-1>
    `,
    {
      removeBooleanAttributeQuotes: true,
      prettyHtml: true
    }
  );
  console.log(`SERVER RENDERED ${req.url} at ${Date.now()}`);

  const html = renderedHtml.html;
  const withStencilScripts = html.replace(
    '</head>',
    `<script type="module" src="/build/stencil-ssr.esm.js"></script>
    <script nomodule src="/build/stencil-ssr.js"></script></head>`
  );

  res.send(withStencilScripts);
}

async function run() {
  app.use('/build/', express.static(path.join(__dirname, 'www/build')));
  app.use('/assets/', express.static(path.join(__dirname, 'www/assets')));
  app.use(serverRenderer);

  app.listen(port, () =>
    console.log(`server started at http://localhost:${port}/`)
  );
}

run();
