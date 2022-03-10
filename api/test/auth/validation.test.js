const Joi = require('joi');
const authValidation = require('../../src/auth/auth.validation');

describe('test validation auth', () => {
  it('/login: should username/password is correct', async () => {
    Joi.assert(
      {
        username: 'minhtuan',
        password: '123ab@123',
      },
      authValidation.loginDto.body
    );
  });

  it('/register: should is correct', async () => {
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

  it('/logout: should refreshToken is correct', async () => {
    Joi.assert(
      {
        refreshToken: 'asdskwqjofqjf...',
      },
      authValidation.logoutDto.body
    );
  });

  it('/refresh-token: should refreshToken is correct', async () => {
    Joi.assert(
      {
        refreshToken: 'asdskwqjofqjf...',
      },
      authValidation.refreshTokenDto.body
    );
  });
});
