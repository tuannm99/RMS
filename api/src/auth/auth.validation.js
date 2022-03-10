const Joi = require('joi');

const loginDto = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const registerDto = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string(),
    name: {
      firstName: Joi.string(),
      lastName: Joi.string(),
    },
  }),
};

const refreshTokenDto = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const logoutDto = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = { loginDto, registerDto, refreshTokenDto, logoutDto };
