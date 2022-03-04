const Joi = require('joi');

const loginDto = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    mail: Joi.string(),
  }),
};

const registerDto = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
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
