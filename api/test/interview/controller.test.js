const request = require('supertest');
const httpStatus = require('http-status');

const dbHandler = require('../index');
const bootstrap = require('../../src/index');

const userService = require('../../src/user/user.service');
const jobService = require('../../src/job/job.service');
const candidateService = require('../../src/candidate/candidate.service');
const interviewService = require('../../src/interview/interview.service');
const { adminToken, hmToken } = require('../fixtures/token');

const USERS = require('../fixtures/users');
const JOBS = require('../fixtures/jobs');
const CANDIDATES = require('../fixtures/candidates');
const INTERVIEWS = require('../fixtures/interviews');

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

  await interviewService.createInterview(INTERVIEWS[0]);
  await interviewService.createInterview(INTERVIEWS[1]);
});

// afterEach(async () => {
//   await dbHandler.clearDatabase();
// });

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

describe('interview controller', () => {
  describe('GET /api/v1/candidates/interview/all', () => {
    it('should get interviews successful', async () => {
      const res = await request(app)
        .get('/api/v1/candidates/interview/all')
        .set('Authorization', `Bearer ${hmToken}`)
        .expect(httpStatus.OK);

      expect(res.body.totalResults).toEqual(2);
    });
  });

  describe('GET /api/v1/candidates/:candidateId/interview', () => {
    it('should get interviews by candidate id successful', async () => {
      const res = await request(app)
        .get(`/api/v1/candidates/${CANDIDATES[1]._id}/interview`)
        .set('Authorization', `Bearer ${hmToken}`)
        .expect(httpStatus.OK);

      expect(res.body.totalResults).toEqual(2);
    });
  });

  describe('GET /api/v1/candidates/:candidateId/interview/:id', () => {
    it('should get interviews by candidate id and interview id successful', async () => {
      const res = await request(app)
        .get(`/api/v1/candidates/${CANDIDATES[1]._id}/interview/${INTERVIEWS[0]._id}`)
        .set('Authorization', `Bearer ${hmToken}`)
        .expect(httpStatus.OK);
    });
  });

  describe('POST /api/v1/candidates/:candidateId/interview', () => {
    it('should create interviews successful', async () => {
      const res = await request(app)
        .post(`/api/v1/candidates/${CANDIDATES[1]._id}/interview`)
        .send({
          interviewer: '625bc5fbedd6abca65700ce7',
          candidateId: '625e92859959300ca9224458',
          scheduleBy: '62569867ad1ecbf37b143164',
          feedback: {
            overallRecommendation: 'notYet',
            rate: 0,
          },
          stage: 'technical',
          interviewDate: '2022-04-21T11:00:00.544+07:00',
          duration: 90,
        })
        .set('Authorization', `Bearer ${hmToken}`)
        .expect(httpStatus.OK);

      expect(res.body.stage).toEqual('technical');
      expect(res.body.feedback).toEqual(expect.anything());
    });
  });

  describe('PUT /api/v1/candidates/:candidateId/interview/:id', () => {
    it('should update interviews successful', async () => {
      const res = await request(app)
        .put(`/api/v1/candidates/${CANDIDATES[1]._id}/interview/${INTERVIEWS[0]._id}`)
        .send({
          interviewer: USERS[1]._id,
          feedback: {
            overallRecommendation: 'strongHire',
            rate: 3,
            comment: 'you are good',
          },
          stage: 'technical',
          duration: 1,
        })
        .set('Authorization', `Bearer ${hmToken}`)
        .expect(httpStatus.OK);

      expect(res.body.stage).toEqual('technical');
      expect(res.body.feedback).toEqual(expect.anything());
    });
  });

  describe('DELETE /api/v1/candidates/:candidateId/interview/:id', () => {
    it('should delete interviews feedback successful', async () => {
      const res = await request(app)
        .delete(`/api/v1/candidates/${CANDIDATES[1]._id}/interview/${INTERVIEWS[1]._id}`)
        .set('Authorization', `Bearer ${hmToken}`)
        .expect(httpStatus.OK);
    });
  });
});
