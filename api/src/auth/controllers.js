const accountService = require('../account/service');
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require('../core');
const passport = require('passport');

const register = async (req, res) => {
  //if (validateResult(req, res)) return;

  const { username, password } = req.body;
  try {
    await accountService.create(username, password);

    res.status(200).json({ msg: 'user created!' });
  } catch (e) {
    res.status(401).json({ msg: 'user existed!', e });
  }
};

const login = async (req, res) => {
  //if (validateResult(req, res)) return;

  const { username, password } = req.body;
  try {
    // we get the user with the name and save the resolved promise returned
    const user = await accountService.getByUsername(username);

    if (!user) {
      res.status(401).json({ msg: 'No such user found', user });
    }

    if (user.password === password) {
      // from now on we’ll identify the user by the id and the id is
      // the only personalized value that goes into our token
      const payload = {
        _id: user._id,
        username: user.username,
        role: user.role,
      };
      const token = createAccessToken(payload);
      const refreshToken = createRefreshToken(payload);
      // update refresh token

      await accountService.updateRefreshToken(username, refreshToken);

      res.status(200).json({
        token: token,
        refreshToken: refreshToken,
        user_id: user._id,
        msg: 'login successful!',
      });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  } catch (e) {
    res.status(401).json({ msg: e });
  }
};

const logout = async (req, res) => {
  const { username } = req.body;
  // remove refreshToken
  try {
    await userService.updateRefreshToken(username, null);
    res.status(200).json({ msg: 'logout successful!' });
  } catch (e) {
    //handle error
    res.status(401).json({ msg: e });
  }
};

const forgotPass = async (req, res) => {
  // TODO: need implimentation
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  // verify refreshToken
  try {
    const newToken = verifyRefreshToken(refreshToken);
    res.status(200).json({ msg: 'token updated', newToken });
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized access.', error });
  }
};

// router
const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/forgot-pass', forgotPass);
router.post('/refresh-token', refreshToken);

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ msg: 'protected resource' });
  }
);

module.exports = router;
