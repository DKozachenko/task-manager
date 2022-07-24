/* eslint-disable no-undef */
/* eslint-disable array-bracket-newline */
const winston = require('winston');

const colorsAndTimeFormat = winston.format.combine(
  winston.format.colorize({
    all:true
  }),
  winston.format.label({
    label:'[LOGGER]'
  }),
  winston.format.timestamp({
    format: 'DD-MM-YY HH:mm:ss'
  }),
  winston.format.printf(
    info => `${info.label} ${info.timestamp} ${info.message}`
  )
);

const fileFormat = winston.format.combine(
  winston.format.label({
    label:'[LOGGER]'
  }),
  winston.format.timestamp({
    format: 'DD-MM-YY HH:mm:ss'
  }),
  winston.format.printf(
    info => `${info.label} ${info.timestamp} ${info.message}`
  )
);

winston.addColors({
  info: 'white blueBG',
  warn: 'black yellowBG',
  error: 'white redBG'
});

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      format: winston.format.combine(winston.format.colorize(), colorsAndTimeFormat)
    }),
    new winston.transports.File({ 
      filename: 'logs/error.log',
      level: 'error',
      format: fileFormat
    }),
    new winston.transports.File({ 
      filename: 'logs/warn.log',
      level: 'warn',
      format: fileFormat
    }),
    new winston.transports.File({ 
      filename: 'logs/info.log',
      level: 'info',
      format: fileFormat
    })
  ],
});

module.exports = logger;