const express = require('express');
const morgan = require('morgan');

const CONFIG = require('./config/index');
const app = express();

app.use(morgan(CONFIG.morganFormat));

module.exports = app;