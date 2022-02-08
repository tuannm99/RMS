const envConf = {
  node_env: process.env.NODE_ENV,
  node_port: process.env.NODE_PORT,

  access_token: process.env.ACCESS_TOKEN_SECRECT,
  refresh_token: process.env.REFRESH_TOKEN_SECRECT,

  mongo_username: process.env.MONGO_USERNAME,
  mongo_password: process.env.MONGO_PASSWORD,
  mongo_host: process.env.MONGO_HOST,
  mongo_port: process.env.MONGO_PORT,
  mongo_db_name: process.env.MONGO_DB_NAME,
};

module.exports = envConf;
