const bootstrap = require('./src');
const envConf = require('./src/core/config');
const logger = require('./src/core/logger');

// db
const connectDatabase = require('./src/core/db/db.config');

connectDatabase(envConf.mongo.db_name);

const port = envConf.node_port || 5000;

// running
bootstrap().listen(port, () => {
  logger.info(`app running on port ${port}`);
});
