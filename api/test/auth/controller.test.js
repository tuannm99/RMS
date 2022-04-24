const request = require('supertest');
const httpStatus = require('http-status');

const dbHandler = require('../index');
const bootstrap = require('../../src/index');

const userService = require('../../src/user/user.service');

const USERS = require('../fixtures/users');

const app = bootstrap();

beforeAll(async () => {
  await dbHandler.connect();
  // create user
  await userService.createUser(USERS[0]);
  await userService.createUser(USERS[1]);
});

// afterEach(async () => {
//   await dbHandler.clearDatabase();
// });

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

describe('auth controller', () => {
  describe('GET /api/v1/auth/login', () => {
    it('should username not correctly', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'superadmin2', password: '123@123ab' })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({ code: 400, message: 'User not found' });
    });

    it('should password not correctly', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'superadmin', password: '123@123abc' })
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({ code: 401, message: 'Incorrect username or password' });
    });

    it('should it get users successful', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'superadmin', password: '123@123ab' })
        .expect(httpStatus.OK);

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });
  });

  describe('GET /api/v1/auth/register', () => {
    it('should regsiter user success', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'superadmin2',
          password: '123@123ab',
          email: 'gmacwc@gmail.com',
          phone: '+84363294854',
          role: 'employee',
        })
        .expect(httpStatus.CREATED);

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
      expect(res.body.user).toEqual(expect.anything());
    });

    it('should duplicate user success', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'superadmin',
          password: '123@123ab',
          email: 'gmacwc@gmail.com',
          phone: '+84363294854',
          role: 'employee',
        })
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should phone not valid', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'superadmin',
          password: '123@123ab',
          email: 'gmacwc@gmail.com',
          phone: '+843632948543',
          role: 'employee',
        })
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /api/v1/auth/logout', () => {
    it('should logout successful', async () => {
      const loggedUser = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'superadmin', password: '123@123ab' });

      await request(app)
        .post('/api/v1/auth/logout')
        .send({ refreshToken: loggedUser.body.tokens.refresh.token });
    });
  });

  describe('GET /api/v1/auth/refresh-token', () => {
    it('should refresh successful', async () => {
      const loggedUser = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'superadmin', password: '123@123ab' });

      const res = await request(app)
        .post('/api/v1/auth/refresh-token')
        .send({ refreshToken: loggedUser.body.tokens.refresh.token })
        .expect(httpStatus.OK);

      expect(res.body.newToken).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });
  });
});
