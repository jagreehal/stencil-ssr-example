// loads stencil
require('./dist/hydrate');
const express = require('express');
const path = require('path');

const app = express();
const port = 3030;

app.use(express.static(path.join(__dirname, 'www')));

app.listen(port, () =>
  console.log(`server started at http://localhost:${port}/`)
);
