const accountService = require('../account/account.service');
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require('../core/utils');

register = async (req, res) => {
  const { username, password } = req.body;
  try {
    await accountService.createByUsernamePassword(username, password);

    res.status(200).json({ msg: 'user created!' });
  } catch (e) {
    console.log(e);
    res.status(401).json({ msg: 'user existed!', e });
  }
};

login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // we get the user with the name and save the resolved promise returned
    const user = await accountService.getByUsername(username);

    if (!user) {
      res.status(401).json({ msg: 'No such user found', user });
      return;
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

logout = async (req, res) => {
  const { username } = req.body;
  // remove refreshToken
  try {
    await accountService.updateRefreshToken(username, null);
    res.status(200).json({ msg: 'logout successful!' });
  } catch (e) {
    //handle error
    res.status(401).json({ msg: e });
  }
};

forgotPass = async (req, res) => {
  // TODO: need implimentation
};

refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  // verify refreshToken
  try {
    const newToken = verifyRefreshToken(refreshToken);
    res.status(200).json({ msg: 'token updated', newToken });
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized access.', error });
  }
};

module.exports = { login, logout, register, forgotPass, refreshToken };
