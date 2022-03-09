const Joi = require('joi');
const authValidation = require('../../src/auth/auth.validation');

describe('test validation auth', () => {
  it('should /login username/password is correct', async () => {
    Joi.assert(
      {
        username: 'minhtuan',
        password: '123ab@123',
      },
      authValidation.loginDto.body
    );
  });

  it('should /register is correct', async () => {
    Joi.assert(
      {
        username: 'minhtuan',
        password: '123ab@123',
        email: 'wfjweij@gmail.com',
        role: 'admin',
        name: {
          firstName: 'tuan',
          lastName: 'nguyen',
        },
      },
      authValidation.registerDto.body
    );
  });

  it('should /logout: refreshToken is correct', async () => {
    Joi.assert(
      {
        refreshToken: 'asdskwqjofqjf...',
      },
      authValidation.logoutDto.body
    );
  });

  it('should /refresh-token: refreshToken is correct', async () => {
    Joi.assert(
      {
        refreshToken: 'asdskwqjofqjf...',
      },
      authValidation.refreshTokenDto.body
    );
  });
});
