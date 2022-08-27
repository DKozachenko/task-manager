const app = require('./app/app');
const CONFIG = require('./config');
const logger = require('./utils/logger');
// eslint-disable-next-line no-undef
const port = process.env.PORT || CONFIG.port;

app.listen(port, () => {
  logger.info(`Server started at ${port} port`);
});
