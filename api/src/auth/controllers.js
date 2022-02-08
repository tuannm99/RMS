const register = async (req, res) => {
  res.json('hello');
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

const forgotPass = async (req, res) => {
  // TODO: need implimentation
};

const refreshToken = (req, res) => {};

// router
const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/forgot-pass', forgotPass);
router.post('/refresh-token', refreshToken);

//router.get(
//'/protected',
//passport.authenticate('jwt', { session: false }),
//(req, res) => {
//res.json({ msg: 'protected resource' });
//}
//);
//
module.exports = router;
