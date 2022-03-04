const Joi = require('joi');

const loginDto = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = { loginDto };
