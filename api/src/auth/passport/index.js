const passport = require('passport');
const { jwtStrategy } = require('./jwtStrategy');

// use the strategy
passport.use(jwtStrategy);

module.exports = passport;
