const authValidation = require('../../src/auth/auth.validation');

describe('test validation auth', () => {
  it('should return the user payload', async () => {
    const validateLogin = authValidation.validateLogin();
  });
});
