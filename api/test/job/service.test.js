const dbHandler = require('../index');
const JOBS = require('../fixtures/jobs');

const jobService = require('../../src/job/job.service');

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

const JOB_MOCK_1 = JOBS[0];
const JOB_MOCK_2 = JOBS[1];

describe('job service', () => {
  describe('createJob', () => {
    it('should create job successful', async () => {
      const job = await jobService.createJob(JOB_MOCK_1);

      expect(job.title).toEqual(JOB_MOCK_1.title);
      // expect(job.candidateId).toEqual(JOB_MOCK_1.candidateId);
      expect(job.candidateId.length).toEqual(1);
      expect(job.department).toEqual(JOB_MOCK_1.department);
      expect(job.jobDescription).toEqual(JOB_MOCK_1.jobDescription);
      expect(job.skill).toEqual(JOB_MOCK_1.skill);
      expect(job.experience).toEqual(JOB_MOCK_1.experience);
      expect(job.shortDes).toEqual(JOB_MOCK_1.shortDes);
      expect(job.jobType).toEqual(JOB_MOCK_1.jobType);
    });

    it('should create job failed - wrong department', async () => {
      const fixedJob = { ...JOB_MOCK_1, department: 'ahihi' };
      await expect(() => jobService.createJob(fixedJob)).rejects.toThrow(
        'Job validation failed: department: `ahihi` is not a valid enum value for path `department`.'
      );
    });

    it('should create job failed - no title', async () => {
      const fixedJob = { ...JOB_MOCK_1 };
      delete fixedJob.title;
      await expect(() => jobService.createJob(fixedJob)).rejects.toThrow(
        'Job validation failed: title: Path `title` is required.'
      );
    });
  });

  describe('getAllJob', () => {
    it('ok', async () => {});
  });

  describe('getAllPublishedJob', () => {
    it('ok', async () => {});
  });

  describe('getJobById', () => {
    it('ok', async () => {});
  });

  describe('editJobById', () => {
    it('ok', async () => {});
  });

  describe('deleteJobById', () => {
    it('ok', async () => {});
  });
});
