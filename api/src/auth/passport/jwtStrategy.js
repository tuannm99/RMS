const passportJWT = require('passport-jwt');
const envConf = require('../../core/config');
const { User } = require('../../core/db/schema');
const { tokenTypes } = require('../../constants');
const logger = require('../../core/logger');

const { fromAuthHeaderAsBearerToken } = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: fromAuthHeaderAsBearerToken(),
  secretOrKey: envConf.jwt.secret,
};

exports.jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  logger.info('payload received', jwtPayload);
  try {
    if (jwtPayload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid Token Type');
    }

    const account = await User.findById(jwtPayload.sub);
    if (!account) return done(null, false);

    if (account) {
      return done(null, account);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});
