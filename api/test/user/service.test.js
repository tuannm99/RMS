const dbHandler = require('../index');
const USERS = require('../fixtures/users');

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

const USER_MOCK_1 = USERS[0];
const USER_MOCK_2 = USERS[1];

describe('user service', () => {
  describe('createUser', () => {
    it('should user created correctly', async () => {
      const user = await userService.createUser(USER_MOCK_1);

      expect(USER_MOCK_1.username).toEqual(user.username);
      expect(USER_MOCK_1.password).not.toBe(user.password);
      expect(USER_MOCK_1.email).toEqual(user.email);
      expect(USER_MOCK_1.role).toEqual(user.role);
      expect(USER_MOCK_1.firstName).toEqual(user.firstName);
    });

    it('should it duplicate user', async () => {
      const user = await userService.createUser(USER_MOCK_1);
      expect(USER_MOCK_1.username).toEqual(user.username);
      expect(USER_MOCK_1.password).not.toBe(user.password);

      await expect(() => userService.createUser(USER_MOCK_1)).rejects.toThrow(
        'Username already taken'
      );
    });

    it('should it duplicate email', async () => {
      const newUser = { ...USER_MOCK_1 };
      newUser.username = 'another name';
      await userService.createUser(newUser);
      await expect(() => userService.createUser(USER_MOCK_1)).rejects.toThrow(
        'Email already taken'
      );
    });
  });

  describe('getUserByUsername', () => {
    it('should get user work correctly', async () => {
      await userService.createUser(USER_MOCK_1);
      const user = await userService.getUserByUsername(USER_MOCK_1.username);

      expect(USER_MOCK_1.username).toEqual(user.username);
      expect(USER_MOCK_1.email).toEqual(user.email);
    });

    it('should it not found', async () => {
      await expect(() => userService.getUserByUsername(USER_MOCK_1.username)).rejects.toThrow(
        'User not found'
      );
    });
  });

  describe('getUserByUsernameAndEmail', () => {
    it('should get user work correctly', async () => {
      await userService.createUser(USER_MOCK_1);
      const user = await userService.getUserByUsernameAndEmail(
        USER_MOCK_1.username,
        USER_MOCK_1.email
      );

      expect(USER_MOCK_1.username).toEqual(user.username);
      expect(USER_MOCK_1.email).toEqual(user.email);
    });

    it('should it not found', async () => {
      await expect(() =>
        userService.getUserByUsernameAndEmail(USER_MOCK_1.username, USER_MOCK_1.email)
      ).rejects.toThrow('User not found');
    });

    it('should email and username not match', async () => {
      await userService.createUser(USER_MOCK_1);
      await expect(() =>
        userService.getUserByUsernameAndEmail(USER_MOCK_1.username, USER_MOCK_2.email)
      ).rejects.toThrow('Username and Email not match');
    });
  });

  describe('getUserIdFfromHeaderToken', () => {
    it('should get id success', async () => {
      const userCreated = await userService.createUser(USER_MOCK_1);
      const user = await authService.loginByUsernamePassword(
        USER_MOCK_1.username,
        USER_MOCK_1.password
      );
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
      await userService.createUser(USER_MOCK_1);
      await userService.createUser(USER_MOCK_2);

      const users = await userService.getUsers({}, {});
      expect(users.results.length).toBe(2);

      const users2 = await userService.getUsers({ fullName: USER_MOCK_1.fullName }, {});
      expect(users2.results[0].username).toEqual(USER_MOCK_1.username);
      expect(users2.results[0].fullName).toEqual(USER_MOCK_1.fullName);
      expect(users2.results[0].email).toEqual(USER_MOCK_1.email);
      expect(users2.results[0].role).toEqual(USER_MOCK_1.role);
    });
  });

  describe('getUserById', () => {
    it('should it get user not found', async () => {
      await expect(() => userService.getUserById('622c8059d674306365aef32e')).rejects.toThrow(
        'User not found'
      );
    });

    it('should it get user', async () => {
      const userCreated = await userService.createUser(USER_MOCK_1);
      const user = await userService.getUserById(userCreated._id);

      expect(USER_MOCK_1.username).toEqual(user.username);
      expect(USER_MOCK_1.password).not.toBe(user.password);
      expect(USER_MOCK_1.email).toEqual(user.email);
      expect(USER_MOCK_1.role).toEqual(user.role);
      expect(USER_MOCK_1.firstName).toEqual(user.firstName);
    });
  });

  describe('updateUserById', () => {
    it('should update user success', async () => {
      const userCreated = await userService.createUser(USER_MOCK_1);
      const userChange = pick(USER_MOCK_1, ['fullName', 'role']);
      userChange.fullName = 'AAAAAAA';
      userChange.role = 'hiringManager';
      const updatedUser = await userService.updateUserById(userCreated._id, userChange);

      expect(updatedUser.fullName).not.toEqual(USER_MOCK_1.fullName);
      expect(updatedUser.role).not.toEqual(USER_MOCK_1.role);

      expect(updatedUser.fullName).toEqual(userChange.fullName);
      expect(updatedUser.role).toEqual(userChange.role);
    });
  });

  describe('deleteUserById', () => {
    it('should delete user success', async () => {
      const u1 = await userService.createUser(USER_MOCK_1);
      const u2 = await userService.createUser(USER_MOCK_2);

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
