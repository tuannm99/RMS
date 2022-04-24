const request = require('supertest');
const httpStatus = require('http-status');

const dbHandler = require('../index');
const bootstrap = require('../../src/index');

const userService = require('../../src/user/user.service');
const { adminToken, hmToken } = require('../fixtures/token');

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

describe('user controller', () => {
  describe('GET /api/v1/users', () => {
    it('should it unauthorized', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .expect('Content-Type', /json/)
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should it get users successful', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(res.body.results[0].id).toEqual(expect.anything());
      expect(res.body.results[0].username).toEqual(USERS[0].username);
      expect(res.body.results[0].email).toEqual(USERS[0].email);
      expect(res.body.results[0].role).toEqual(USERS[0].role);
      expect(res.body.results[0].firstName).toEqual(USERS[0].firstName);
      expect(res.body.results[0].lastName).toEqual(USERS[0].lastName);

      expect(res.body.results[1].id).toEqual(expect.anything());
      expect(res.body.results[1].username).toEqual(USERS[1].username);
      expect(res.body.results[1].email).toEqual(USERS[1].email);
      expect(res.body.results[1].role).toEqual(USERS[1].role);
      expect(res.body.results[1].firstName).toEqual(USERS[1].firstName);
      expect(res.body.results[1].lastName).toEqual(USERS[1].lastName);
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should it get successful', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${USERS[1]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(res.body.username).toEqual(USERS[1].username);
      expect(res.body.email).toEqual(USERS[1].email);
      expect(res.body.role).toEqual(USERS[1].role);
      expect(res.body.firstName).toEqual(USERS[1].firstName);
      expect(res.body.lastName).toEqual(USERS[1].lastName);
    });

    it('should it wrong id', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${USERS[2]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should it update successful', async () => {
      const res = await request(app)
        .put(`/api/v1/users/${USERS[1]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ firstName: 'new' })
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(res.body.firstName).toEqual('new');
      expect(res.body.role).toEqual(USERS[1].role);
    });

    it('should it wrong id', async () => {
      const res = await request(app)
        .put(`/api/v1/users/${USERS[2]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ firstName: 'new' })
        .expect('Content-Type', /json/)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should it delete successful', async () => {
      const res = await request(app)
        .delete(`/api/v1/users/${USERS[1]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);
    });

    it('should it hm cannot delete', async () => {
      const res = await request(app)
        .delete(`/api/v1/users/${USERS[0]._id}`)
        .set('Authorization', `Bearer ${hmToken}`)
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});
