const dbHandler = require('../index');

// const { User } = require('../../src/core/db/schema');
const userService = require('../../src/user/user.service');
const tokenService = require('../../src/token/token.service');
const authService = require('../../src/auth/auth.service');

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

const userMock = {
  username: 'employee1ss23',
  password: '123@123ab',
  email: 'employesea@gmail.com',
  role: 'employee',
  firstName: 'tuan',
  fullName: 'Nguyen Minh Tuan',
};

const userMock2 = {
  username: 'tuan23',
  password: '123@1ssa23ab',
  email: 'employes@gmail.com',
  role: 'employee',
  firstName: 'tuan',
  fullName: 'Nguyen Tat Thanh',
};

describe('auth service', () => {
  describe('loginByUsernamePassword', () => {
    it('should user not found', async () => {
      await expect(() =>
        authService.loginByUsernamePassword(userMock.username, userMock.password)
      ).rejects.toThrow('User not found');
    });

    it('should password not correct', async () => {
      const user = await userService.createUser(userMock);

      expect(userMock.username).toEqual(user.username);
      expect(userMock.password).not.toBe(user.password);
      expect(userMock.email).toEqual(user.email);
      expect(userMock.role).toEqual(user.role);
      expect(userMock.firstName).toEqual(user.firstName);
      expect(userMock.fullName).toEqual(user.fullName);
      await expect(() =>
        authService.loginByUsernamePassword(userMock.username, userMock2.password)
      ).rejects.toThrow('Incorrect email or password');
    });

    it('should login ok', async () => {
      const user = await userService.createUser(userMock);

      expect(userMock.username).toEqual(user.username);
      expect(userMock.password).not.toBe(user.password);
      expect(userMock.email).toEqual(user.email);
      expect(userMock.role).toEqual(user.role);
      expect(userMock.firstName).toEqual(user.firstName);
      expect(userMock.fullName).toEqual(user.fullName);

      const login = await authService.loginByUsernamePassword(userMock.username, userMock.password);

      expect(userMock.username).toEqual(login.username);
      expect(userMock).not.toBe(login.password);
      expect(userMock.email).toEqual(login.email);
      expect(userMock.role).toEqual(login.role);
      expect(userMock.firstName).toEqual(login.firstName);
      expect(userMock.fullName).toEqual(login.fullName);
    });
  });

  describe('logout', () => {
    it('should not have refresh token', async () => {
      await expect(() => authService.logout(userMock.username)).rejects.toThrow('Token not found');
    });

    it('should logout ok', async () => {
      const user = await userService.createUser(userMock);
      const token = await tokenService.generateAuthTokens(user);

      await tokenService.verifyToken(token.refresh.token, 'refresh');
      await authService.logout(token.refresh.token);

      await expect(() => tokenService.verifyToken(token.refresh.token, 'refresh')).rejects.toThrow(
        'Token not found'
      );

      expect(userMock.username).toEqual(user.username);
    });
  });

  describe('refreshAuth', () => {
    it('should not have refresh token', async () => {
      await expect(() => authService.logout(userMock.username)).rejects.toThrow('Token not found');
    });

    it('should logout ok', async () => {
      const user = await userService.createUser(userMock);
      const token = await tokenService.generateAuthTokens(user);

      expect(userMock.username).toEqual(user.username);

      await tokenService.verifyToken(token.refresh.token, 'refresh');
      const refreshed = await authService.refreshAuth(token.refresh.token);

      expect(refreshed).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });

      const userIdFromToken = await userService.getUserIdFromHeaderToken(
        `Bearer ${refreshed.refresh.token}`
      );

      expect(user._id.toString()).toEqual(userIdFromToken);
    });
  });
});
