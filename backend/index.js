const app = require('./app');
const CONFIG = require('./config');
const logger = require('./logger');

app.listen(CONFIG.port, () => {
  logger.info(`Server started at ${CONFIG.port} port`);
});
