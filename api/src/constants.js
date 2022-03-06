const TOKEN_TYPES = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
};

// Role
const ROLES = {
  admin: 'admin',
  hiringManager: 'hiringManager',
  guest: 'guest',
  employee: 'employee',
};

// Candidate status
const CANDIDATE_STATUS = {
  reject: 'reject',
  open: 'open',
  approve: 'approve',
};

// Interview Stages
const STAGES = {
  contact: 'contact',
  test: 'test',
  technical: 'technical',
  cultureFit: 'cultureFit',
};

// Event for async task
const EVENTS = {
  sendMail: 'sendMail',
};

module.exports = {
  tokenTypes: TOKEN_TYPES,
  ROLES,
  EVENTS,
  STAGES,
  statusCandidate: CANDIDATE_STATUS,
};
