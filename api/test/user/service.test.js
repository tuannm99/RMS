const dbHandler = require('../index');

// const { User } = require('../../src/core/db/schema');
const userService = require('../../src/user/user.service');
const tokenService = require('../../src/token/token.service');
const authService = require('../../src/auth/auth.service');
const { pick } = require('../../src/core/utils');

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

      await expect(() => userService.createUser(userMock)).rejects.toThrow(
        'Username already taken'
      );
    });

    it('should it duplicate email', async () => {
      const newUser = { ...userMock };
      newUser.username = 'another name';
      await userService.createUser(newUser);
      await expect(() => userService.createUser(userMock)).rejects.toThrow('Email already taken');
    });
  });

  describe('getUserByUsername', () => {
    it('should get user work correctly', async () => {
      await userService.createUser(userMock);
      const user = await userService.getUserByUsername(userMock.username);

      expect(userMock.username).toEqual(user.username);
      expect(userMock.email).toEqual(user.email);
    });

    it('should it not found', async () => {
      await expect(() => userService.getUserByUsername(userMock.username)).rejects.toThrow(
        'User not found'
      );
    });
  });

  describe('getUserIdFfromHeaderToken', () => {
    it('should get id success', async () => {
      const userCreated = await userService.createUser(userMock);
      const user = await authService.loginByUsernamePassword(userMock.username, userMock.password);
      const tokens = await tokenService.generateAuthTokens(user);
      const userIdFromToken = await userService.getUserIdFromHeaderToken(
        `Bearer ${tokens.refresh.token}`
      );

      expect(userCreated._id.toString()).toEqual(userIdFromToken);
    });
  });

  describe('getUsers', () => {
    it('should it get empty array', async () => {
      const users = await userService.getUsers({}, {});
      expect(users.results.length).toBe(0);
    });

    it('should it get all user', async () => {
      await userService.createUser(userMock);
      await userService.createUser(userMock2);

      const users = await userService.getUsers({}, {});
      expect(users.results.length).toBe(2);

      const users2 = await userService.getUsers({ fullName: userMock.fullName }, {});
      expect(users2.results[0].username).toEqual(userMock.username);
      expect(users2.results[0].fullName).toEqual(userMock.fullName);
      expect(users2.results[0].email).toEqual(userMock.email);
      expect(users2.results[0].role).toEqual(userMock.role);
    });
  });

  describe('getUserById', () => {
    it('should it get user not found', async () => {
      await expect(() => userService.getUserById('622c8059d674306365aef32e')).rejects.toThrow(
        'User not found'
      );
    });

    it('should it get user', async () => {
      const userCreated = await userService.createUser(userMock);
      const user = await userService.getUserById(userCreated._id);

      expect(userMock.username).toEqual(user.username);
      expect(userMock.password).not.toBe(user.password);
      expect(userMock.email).toEqual(user.email);
      expect(userMock.role).toEqual(user.role);
      expect(userMock.firstName).toEqual(user.firstName);
    });
  });

  describe('updateUserById', () => {
    it('should update user success', async () => {
      const userCreated = await userService.createUser(userMock);
      const userChange = pick(userMock, ['fullName', 'role']);
      userChange.fullName = 'AAAAAAA';
      userChange.role = 'hiringManager';
      const updatedUser = await userService.updateUserById(userCreated._id, userChange);

      expect(updatedUser.fullName).not.toEqual(userMock.fullName);
      expect(updatedUser.role).not.toEqual(userMock.role);

      expect(updatedUser.fullName).toEqual(userChange.fullName);
      expect(updatedUser.role).toEqual(userChange.role);
    });
  });

  describe('deleteUserById', () => {
    it('should delete user success', async () => {
      const u1 = await userService.createUser(userMock);
      const u2 = await userService.createUser(userMock2);

      let users = await userService.getUsers({}, {});
      expect(users.results.length).toBe(2);

      const deletedUser = await userService.deleteUserById(u1._id);

      expect(u1._id.toString()).toEqual(deletedUser._id.toString());

      users = await userService.getUsers({}, {});
      expect(users.results.length).toBe(1);
      expect(users.results[0]._id.toString()).toEqual(u2._id.toString());
    });
  });
});
