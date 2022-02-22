const envConf = {
  node_env: process.env.NODE_ENV,
  node_port: process.env.NODE_PORT,

  jwt: {
    secret: process.env.SECRET,
  },

  mongo: {
    url: process.env.MONGO_URL,
    db_name: process.env.MONGO_DB_NAME + (process.env.NODE_ENV === 'test' ? '-test' : ''),
  },

  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },
};

module.exports = envConf;
