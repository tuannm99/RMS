const dbHandler = require('../index');

// const { User } = require('../../src/core/db/schema');
const userService = require('../../src/user/user.service');

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
};

describe('user service', () => {
  describe('createUser', () => {
    it('should user created correctly', async () => {
      const user = await userService.createUser(userMock);

      expect(userMock.username).toEqual(user.username);
      expect(userMock.password).not.toBe(user.password);
      expect(userMock.email).toEqual(user.email);
      expect(userMock.role).toEqual(user.role);
      expect(userMock.firstName).toEqual(user.firstName);
    });

    it('should it duplicate user', async () => {
      const user = await userService.createUser(userMock);
      expect(userMock.username).toEqual(user.username);
      expect(userMock.password).not.toBe(user.password);

      await expect(() => userService.createUser(userMock)).rejects.toThrow();
    });

    it('should it duplicate email', async () => {
      const newUser = { ...userMock };
      newUser.username = 'another name';
      await userService.createUser(userMock);
      await expect(() => userService.createUser(userMock)).rejects.toThrow();
    });
  });

  describe('getUserByUsername', () => {
    it('should get user work correctly', async () => {
      await userService.createUser(userMock);
      const user = await userService.getUserByUsername(userMock.username);

      expect(userMock.username).toEqual(user.username);
      expect(userMock.email).toEqual(user.email);
    });
  });
});
