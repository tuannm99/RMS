const bootstrap = require('./src');
const envConf = require('./src/core/config');

// db
const connectDatabase = require('./src/core/db/db.config');

connectDatabase();

const port = envConf.node_port || 5000;

// running
bootstrap().listen(port, () => {
  console.log(`app running on port ${port}`);
});
