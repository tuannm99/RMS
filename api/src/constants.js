const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
};

// TODO: fix role
const ROLES = {
  admin: 'admin',
  hiringManager: 'hiringManager',
  guest: 'guest',
  employee: 'employee',
};

const EVENTS = {
  sendMail: 'sendMail',
};

module.exports = {
  tokenTypes,
  ROLES,
  EVENTS,
};
