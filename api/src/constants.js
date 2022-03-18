const TOKEN_TYPES = {
  access: 'access',
  refresh: 'refresh',
  resetPassword: 'resetPassword',
  verifyEmail: 'verifyEmail',
};

// Role
const ROLES = {
  admin: 'admin',
  hiringManager: 'hiringManager',
  guest: 'guest',
  employee: 'employee',
};

// Department
const DEPARTMENTS = {
  administration: 'administration',
  sale: 'sale',
  finance: 'finance',
  humanResource: 'humanResources',
  marketing: 'marketing',
  engineering: 'engineering',
};

// Candidate status
const CANDIDATE_STATUS = {
  reject: 'reject',
  open: 'open',
  approve: 'approve',
};

// Job status
const JOB_STATUS = {
  published: 'published',
  onHold: 'onHold',
  deleted: 'deleted',
};

// Interview Stages
const STAGES = {
  contact: 'contact',
  test: 'test',
  technical: 'technical',
  cultureFit: 'cultureFit',
};

// Role
const FEEDBACK = {
  strongHire: 'strongHire',
  hire: 'hire',
  noHire: 'noHire',
  strongNoHire: 'strongNoHire',
  notYet: 'notYet',
};

// Event for async task
const EVENTS = {
  sendMail: 'sendMail',
};

module.exports = {
  TOKEN_TYPES,
  ROLES,
  EVENTS,
  STAGES,
  JOB_STATUS,
  FEEDBACK,
  CANDIDATE_STATUS,
};
