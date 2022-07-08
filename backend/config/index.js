const port = require('./port');
const morganFormat = require('./morgan-format');
const mongoUrl = require('./mongo-url');
const prefix = require('./prefix');

const CONFIG = {
  port,
  morganFormat,
  mongoUrl,
  prefix
};

module.exports = CONFIG;