const port = require('./port');
const morganFormat = require('./morgan-format');
const mongoUrl = require('./mongo-url');

const CONFIG = {
  port,
  morganFormat,
  mongoUrl
};

module.exports = CONFIG;