import passport from 'passport';
import { jwtStrategy } from './jwtStrategy.js';

// use the strategy
passport.use(jwtStrategy);

export default passport;
