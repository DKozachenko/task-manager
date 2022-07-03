const express = require('express');
const morgan = require('morgan');

const CONFIG = require('./config/index');
const app = express();

/** Remove test method */
app.get('/test', (req, res) =>  {
  res.status(200).send('Passed');
});

app.use(morgan(CONFIG.morganFormat));

module.exports = app;