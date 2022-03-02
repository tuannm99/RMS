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

// Event for async task
const EVENTS = {
  sendMail: 'sendMail',
};

const statusCandidate = {
  reject: 'reject',
  open: 'open',
  approve: 'approve',
};

module.exports = {
  tokenTypes,
  ROLES,
  EVENTS,
  statusCandidate,
};
