const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const CONFIG = require('../config/index');
const logger = require('../logger/logger');
const authRoutes = require('../routes/auth');
const colorsRoutes = require('../routes/colors');
const labelsRoutes = require('../routes/labels');

const app = express();

/** Remove test method */
app.get('/test', (req, res) =>  {
  res.status(200).send('Passed');
});

/** Connection to MongoDb */
mongoose.connect(CONFIG.mongoUrl)
  .then(() => logger.info('Connected to MongoDb'))
  .catch(error => logger.error('Connection to MongoDb failed', error));

app.use(morgan(CONFIG.morganFormat));
app.use(`/${CONFIG.prefix}/auth`, authRoutes);
app.use(`/${CONFIG.prefix}/colors`, colorsRoutes);
app.use(`/${CONFIG.prefix}/labels`, labelsRoutes);

module.exports = app;