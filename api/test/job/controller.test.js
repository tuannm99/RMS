const request = require('supertest');
const httpStatus = require('http-status');

const dbHandler = require('../index');
const bootstrap = require('../../src/index');

const userService = require('../../src/user/user.service');
const jobService = require('../../src/job/job.service');
const { adminToken, hmToken } = require('../fixtures/token');

const USERS = require('../fixtures/users');
const JOBS = require('../fixtures/jobs');

const app = bootstrap();

beforeAll(async () => {
  await dbHandler.connect();
  // create user
  await userService.createUser(USERS[0]);
  await userService.createUser(USERS[1]);

  await jobService.createJob(JOBS[0]);
  await jobService.createJob(JOBS[1]);
});

// afterEach(async () => {
//   await dbHandler.clearDatabase();
// });

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

describe('job controller', () => {
  describe('GET /api/v1/jobs', () => {
    it('should get jobs successful', async () => {
      const res = await request(app)
        .get('/api/v1/jobs')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(res.body.totalResults).toEqual(2);
    });
  });

  describe('GET /api/v1/jobs/:id', () => {
    it('should get jobs by id successful', async () => {
      const res = await request(app)
        .get(`/api/v1/jobs/${JOBS[0]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(res.body.title).toEqual(JOBS[0].title);
    });
  });

  describe('PUT /api/v1/jobs/:id', () => {
    it('should update jobs fobbidden', async () => {
      const res = await request(app)
        .put(`/api/v1/jobs/${JOBS[0]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'tuan 1231231asdasdsadas2312',
          department: 'hm',
          jobType: 'full Time',
          location: 'Ha Noi',
          jobDescription: 'job very good',
          skill: 'nodejs',
          minSalary: 1000,
          maxSalary: 1500,
          current: 'USD',
        })
        .expect('Content-Type', /json/)
        .expect(httpStatus.FORBIDDEN);
    });

    it('should update jobs successful', async () => {
      const res = await request(app)
        .put(`/api/v1/jobs/${JOBS[0]._id}`)
        .set('Authorization', `Bearer ${hmToken}`)
        .send({
          title: 'tuan change title',
          department: 'hm',
          jobType: 'full Time',
          location: 'Ha Noi',
          jobDescription: 'job very good',
          skill: 'nodejs',
          minSalary: 1000,
          maxSalary: 1500,
          current: 'USD',
        })
        .expect(httpStatus.OK);
      expect(res.body.title).not.toEqual(JOBS[0].title);
    });
  });

  describe('POST /api/v1/jobs', () => {
    it('should update jobs fobbidden', async () => {
      const res = await request(app)
        .post('/api/v1/jobs')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'tuan 1231231asdasdsadas2312',
          department: 'hm',
          jobType: 'full Time',
          location: 'Ha Noi',
          jobDescription: 'job very good',
          skill: 'nodejs',
          minSalary: 1000,
          maxSalary: 1500,
          current: 'USD',
        })
        .expect('Content-Type', /json/)
        .expect(httpStatus.FORBIDDEN);
    });

    it('should create jobs successful', async () => {
      const res = await request(app)
        .post(`/api/v1/jobs`)
        .set('Authorization', `Bearer ${hmToken}`)
        .send({
          userId: '62280b40efbbfebf28252bde',
          candidateId: [],
          title: 'ngay mai di lam',
          status: 'onHold',
          department: 'finance',
          jobType: 'full Time',
          location: 'Ha Noi',
          jobDescription: 'very good',
          skill: 'nodejs',
          experience: '',
          minSalary: '1000',
          maxSalary: '1500',
          currency: 'USD',
        })
        .expect(httpStatus.OK);

      expect(res.body.title).toEqual('ngay mai di lam');
      expect(res.body.status).toEqual('onHold');
      expect(res.body.department).toEqual('finance');
      expect(res.body.jobDescription).toEqual('very good');
    });
  });

  describe('DELETE /api/v1/jobs/:id', () => {
    it('should delete jobs fobbidden', async () => {
      const res = await request(app)
        .delete(`/api/v1/jobs/${JOBS[0]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.FORBIDDEN);
    });

    it('should delete jobs successful', async () => {
      await request(app)
        .delete(`/api/v1/jobs/${JOBS[0]._id}`)
        .set('Authorization', `Bearer ${hmToken}`)
        .expect(httpStatus.OK);

      const res = await request(app)
        .get(`/api/v1/jobs/${JOBS[0]._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(res.body.status).toEqual('deleted');
    });
  });
});
