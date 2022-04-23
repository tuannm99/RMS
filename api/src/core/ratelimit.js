const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const candidateSubmitCVLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // TODO: 1 hour -> 1 day
  max: 5,
  message: 'Too many cv submitted from this IP, please try again after an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const refreshPassLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // limit each 15 minutes
  max: 5,
  message:
    'you have send too many request! If request success please check your mail, your password had been reseted, if not try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const refreshTokenLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // limit each 15 minutes
  max: 1,
  message: 'you have send too many request!',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const logoutLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // limit each 15 minutes
  max: 1,
  message: 'you have send too many request!',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  limiter,
  candidateSubmitCVLimiter,
  refreshPassLimiter,
  refreshTokenLimiter,
  logoutLimiter,
};
