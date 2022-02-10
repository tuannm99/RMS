const passportJWT = require('passport-jwt');
const envConf = require('../../core/config');
const Account = require('../../core/db/schema/account');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envConf.access_token,
};

// lets create our strategy for web token
exports.jwtStrategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  console.log('payload received', jwt_payload);
  try {
    const account = await Account.findOne({ _id: jwt_payload._id });
    if (!account) return done(null, false);

    // if user not find rtoken mean user aldready logged out
    // require login again
    if (account.rtoken === null) return done(null, false);

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
