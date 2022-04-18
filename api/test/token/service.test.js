const moment = require('moment');
const dbHandler = require('../index');

const TOKEN_TYPES = require('../../src/constants');
const USERS = require('../fixtures/users');

const tokenService = require('../../src/token/token.service');

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe('token service', () => {
  describe('generateToken', () => {
    it('should token created correctly', async () => {
      const expire = moment().add(10, 'minutes');
      const token = tokenService.generateToken(USERS[0]._id, expire, TOKEN_TYPES.access);
      expect(typeof token).toBe('string');
    });
  });

  describe('saveToken', () => {
    it('should it save token correctly', async () => {
      const expire = moment().add(10, 'minutes');
      const token = tokenService.generateToken(USERS[0]._id, expire, TOKEN_TYPES.refresh);

      const saved = await tokenService.saveToken(token, USERS[0]._id, expire, 'refresh');

      expect(saved.token).toEqual(token);
    });

    it('should it wrong type token', async () => {
      const expire = moment().add(10, 'minutes');
      const token = tokenService.generateToken(USERS[0]._id, expire, TOKEN_TYPES.refresh);

      await expect(() =>
        tokenService.saveToken(token, USERS[0]._id, expire, 'access')
      ).rejects.toThrow(
        'Token validation failed: type: `access` is not a valid enum value for path `type`.'
      );
    });
  });

  describe('verifyToken', () => {
    it('should verify token ok', async () => {
      const expire = moment().add(10, 'minutes');
      const token = tokenService.generateToken(USERS[0]._id, expire, TOKEN_TYPES.refresh);
      const saved = await tokenService.saveToken(token, USERS[0]._id, expire, 'refresh');
      const verified = await tokenService.verifyToken(saved.token, 'refresh');

      expect(typeof verified).toEqual('object');
    });
  });

  describe('generateAuthTokens', () => {
    it('should it generate token', async () => {
      const token = await tokenService.generateAuthTokens({ ...USERS[0], id: USERS[0]._id });

      expect(token).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });
  });

  describe('deleteByRefreshToken', () => {
    it('should it delete successful', async () => {
      const token = await tokenService.generateAuthTokens({ ...USERS[0], id: USERS[0]._id });

      const deleted = await tokenService.deleteByRefreshToken(token.refresh.token);

      expect.anything(deleted);
    });
  });
});
