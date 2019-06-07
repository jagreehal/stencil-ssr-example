const stencil = require('./dist/hydrate');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3333;

const indexHtml = fs.readFileSync(path.resolve('./src/index.html'), 'utf8');

async function serverRenderer(req, res, next) {
  const renderedHtml = await stencil.renderToString(indexHtml, {
    url: req.url, // render correct page-component based on url

    removeBooleanAttributeQuotes: true, // remove overwhelming quotes

    prettyHtml: true, // better read-ability when debuggin'
  });
  console.log(`SERVER RENDERED ${req.url} at ${Date.now()}`);
  res.send(renderedHtml.html);
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
