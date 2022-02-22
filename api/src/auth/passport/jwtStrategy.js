const passportJWT = require('passport-jwt');
const envConf = require('../../core/config');
const { User } = require('../../core/db/schema');
const { tokenTypes } = require('../../constants');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envConf.jwt.secret,
};

exports.jwtStrategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  console.log('payload received', jwt_payload);
  try {
    if (jwt_payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid Token Type');
    }

    const account = await User.findById(jwt_payload.sub);
    if (!account) return done(null, false);

    if (account) {
      return done(null, account);
    } else {
      return done(null, false);
      // or create a new account
    }
  } catch (err) {
    return done(err, false);
  }
});
