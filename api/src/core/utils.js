const httpStatus = require('http-status');
const Joi = require('joi');
const ApiError = require('./apiError');

exports.validate = (schema) => (req, res, next) => {
  const validSchema = this.pick(schema, ['params', 'query', 'body']);
  const object = this.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
exports.pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
