const app = require('./app/app');
const CONFIG = require('./config');
const logger = require('./logger/logger');

app.listen(CONFIG.port, () => {
  logger.info(`Server started at ${CONFIG.port} port`);
});
