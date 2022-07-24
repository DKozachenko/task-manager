const port = require('./port');
const morganFormat = require('./morgan-format');
const mongoUrl = require('./mongo-url');
const prefix = require('./prefix');
const jwt = require('./jwt');

const CONFIG = {
  port,
  morganFormat,
  mongoUrl,
  prefix,
  jwt
};

module.exports = CONFIG;