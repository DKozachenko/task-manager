const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const CONFIG = require('../config/index');
const logger = require('../utils/logger');

const authRoutes = require('../routes/auth');
const tasksRoutes = require('../routes/tasks');
const labelsRoutes = require('../routes/labels');
const colorsRoutes = require('../routes/colors');

const app = express();

/** Connection to MongoDb */
mongoose.connect(CONFIG.mongoUrl)
  .then(() => logger.info('Connected to MongoDb'))
  .catch(error => logger.error('Connection to MongoDb failed', error));

app.use(morgan(CONFIG.morganFormat));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

require('../middwares/auth')(passport);
app.use(passport.initialize());

app.use(`/${CONFIG.prefix}/auth`, authRoutes);
app.use(`/${CONFIG.prefix}/tasks`, tasksRoutes);
app.use(`/${CONFIG.prefix}/labels`, labelsRoutes);
app.use(`/${CONFIG.prefix}/colors`, colorsRoutes);

module.exports = app;