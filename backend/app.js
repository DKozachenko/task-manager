const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const CONFIG = require('./config/index');
const app = express();

/** Remove test method */
app.get('/test', (req, res) =>  {
  res.status(200).send('Passed');
});

/** Connection to MongoDb */
mongoose.connect(CONFIG.mongoUrl)
  .then(() => console.log('Connected to MongoDb'))
  .catch(error => console.error(error));

app.use(morgan(CONFIG.morganFormat));

module.exports = app;