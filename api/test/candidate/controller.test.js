const request = require('supertest');
const httpStatus = require('http-status');

const dbHandler = require('../index');
const bootstrap = require('../../src/index');

const userService = require('../../src/user/user.service');
const jobService = require('../../src/job/job.service');
const candidateService = require('../../src/candidate/candidate.service');
const { adminToken, hmToken } = require('../fixtures/token');

const USERS = require('../fixtures/users');
const JOBS = require('../fixtures/jobs');
const CANDIDATES = require('../fixtures/candidates');

const app = bootstrap();

beforeAll(async () => {
  await dbHandler.connect();
  // create user
  await userService.createUser(USERS[0]);
  await userService.createUser(USERS[1]);

  await jobService.createJob(JOBS[0]);
  await jobService.createJob(JOBS[1]);

  await candidateService.createCandidate(CANDIDATES[0]);
  await candidateService.createCandidate(CANDIDATES[1]);
});

// afterEach(async () => {
//   await dbHandler.clearDatabase();
// });

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

describe('candidate controller', () => {
  describe('GET /api/v1/candidates', () => {
    it('should get candidates successful', async () => {
      const res = await request(app)
        .get('/api/v1/candidates')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(res.body.totalResults).toEqual(2);
    });
  });

  describe('GET /api/v1/candidates/:id', () => {
    it('should get candidate by id successful', async () => {
      const res = await request(app)
        .get(`/api/v1/candidates/${CANDIDATES[0]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(res.body.firstName).toEqual(CANDIDATES[0].firstName);
      expect(res.body.lastName).toEqual(CANDIDATES[0].lastName);
      expect(res.body.fullName).toEqual(CANDIDATES[0].fullName);
      expect(res.body.email).toEqual(CANDIDATES[0].email);
      expect(res.body.phone).toEqual(CANDIDATES[0].phone);
    });
  });

  describe('DELETE /api/v1/candidates/:id', () => {
    it('should delete candidate fobbidden', async () => {
      const res = await request(app)
        .delete(`/api/v1/candidates/${CANDIDATES[0]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.FORBIDDEN);
    });

    it('should delete candidate by id successful', async () => {
      const res = await request(app)
        .delete(`/api/v1/candidates/${CANDIDATES[0]._id}`)
        .set('Authorization', `Bearer ${hmToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      await request(app)
        .get(`/api/v1/candidates/${CANDIDATES[0]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
