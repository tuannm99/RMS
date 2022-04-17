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
const JOB_MOCK_3 = JOBS[2];
const JOB_MOCK_4 = JOBS[3];

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
    it('should it get all', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await jobService.createJob(JOB_MOCK_2);

      const jobs = await jobService.getAllJob({}, {}); // auto sort by date asc
      expect(jobs.results.length).toEqual(2);
      expect(jobs.results[0].department).toEqual(JOB_MOCK_1.department);
      expect(jobs.results[0].jobDescription).toEqual(JOB_MOCK_1.jobDescription);
      expect(jobs.results[0].skill).toEqual(JOB_MOCK_1.skill);
      expect(jobs.results[0].experience).toEqual(JOB_MOCK_1.experience);
      expect(jobs.results[0].shortDes).toEqual(JOB_MOCK_1.shortDes);
      expect(jobs.results[0].jobType).toEqual(JOB_MOCK_1.jobType);
      expect(jobs.results[1].department).toEqual(JOB_MOCK_2.department);
      expect(jobs.results[1].jobDescription).toEqual(JOB_MOCK_2.jobDescription);
      expect(jobs.results[1].skill).toEqual(JOB_MOCK_2.skill);
      expect(jobs.results[1].experience).toEqual(JOB_MOCK_2.experience);
      expect(jobs.results[1].shortDes).toEqual(JOB_MOCK_2.shortDes);
      expect(jobs.results[1].jobType).toEqual(JOB_MOCK_2.jobType);
    });
  });

  describe('getAllPublishedJob', () => {
    it('should it get published job', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await jobService.createJob(JOB_MOCK_2);
      await jobService.createJob(JOB_MOCK_3);
      await jobService.createJob(JOB_MOCK_4);

      const jobs = await jobService.getAllJob({ status: 'published' }, {}); // auto sort by date asc
      expect(jobs.results.length).toEqual(2);
      expect(jobs.results[0].department).toEqual(JOB_MOCK_1.department);
      expect(jobs.results[0].jobDescription).toEqual(JOB_MOCK_1.jobDescription);
      expect(jobs.results[0].skill).toEqual(JOB_MOCK_1.skill);
      expect(jobs.results[0].experience).toEqual(JOB_MOCK_1.experience);
      expect(jobs.results[0].shortDes).toEqual(JOB_MOCK_1.shortDes);
      expect(jobs.results[0].jobType).toEqual(JOB_MOCK_1.jobType);
      expect(jobs.results[1].department).toEqual(JOB_MOCK_3.department);
      expect(jobs.results[1].jobDescription).toEqual(JOB_MOCK_3.jobDescription);
      expect(jobs.results[1].skill).toEqual(JOB_MOCK_3.skill);
      expect(jobs.results[1].experience).toEqual(JOB_MOCK_3.experience);
      expect(jobs.results[1].shortDes).toEqual(JOB_MOCK_3.shortDes);
      expect(jobs.results[1].jobType).toEqual(JOB_MOCK_3.jobType);
    });

    it('should it not get published job', async () => {
      await jobService.createJob(JOB_MOCK_2);
      await jobService.createJob(JOB_MOCK_4);

      const jobs = await jobService.getAllJob({ status: 'published' }, {}); // auto sort by date asc
      expect(jobs.results.length).toEqual(0);
    });
  });

  describe('getJobById', () => {
    it('should it get job ok', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await jobService.createJob(JOB_MOCK_2);

      const job = await jobService.getJobById(JOB_MOCK_1._id);

      expect(job.title).toEqual(JOB_MOCK_1.title);
      expect(job.candidateId.length).toEqual(1);
      expect(job.department).toEqual(JOB_MOCK_1.department);
      expect(job.jobDescription).toEqual(JOB_MOCK_1.jobDescription);
      expect(job.skill).toEqual(JOB_MOCK_1.skill);
      expect(job.experience).toEqual(JOB_MOCK_1.experience);
      expect(job.shortDes).toEqual(JOB_MOCK_1.shortDes);
      expect(job.jobType).toEqual(JOB_MOCK_1.jobType);
    });

    it('should job id not found', async () => {
      await jobService.createJob(JOB_MOCK_2);

      await expect(() => jobService.getJobById(JOB_MOCK_1._id)).rejects.toThrow(
        'No such job found'
      );
    });
  });

  describe('editJobById', () => {
    it('should it edit job successful', async () => {
      await jobService.createJob(JOB_MOCK_1);

      const body = { ...JOB_MOCK_1, title: 'newjob title', jobDescription: 'newjob descript' };

      const job = await jobService.editJobById(JOB_MOCK_1._id, body);

      expect(job.title).toEqual(body.title);
      expect(job.department).toEqual(JOB_MOCK_1.department);
      expect(job.jobDescription).toEqual(body.jobDescription);
      expect(job.skill).toEqual(JOB_MOCK_1.skill);
      expect(job.experience).toEqual(JOB_MOCK_1.experience);
      expect(job.shortDes).toEqual(JOB_MOCK_1.shortDes);
      expect(job.jobType).toEqual(JOB_MOCK_1.jobType);
    });

    it('should job id not found', async () => {
      await jobService.createJob(JOB_MOCK_2);

      await expect(() => jobService.getJobById(JOB_MOCK_1._id)).rejects.toThrow(
        'No such job found'
      );
    });
  });

  describe('deleteJobById', () => {
    it('should job id not found', async () => {
      await jobService.createJob(JOB_MOCK_2);

      await expect(() => jobService.getJobById(JOB_MOCK_1._id)).rejects.toThrow(
        'No such job found'
      );
    });

    it('should it delete job success', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await jobService.createJob(JOB_MOCK_2);
      await jobService.createJob(JOB_MOCK_3);
      await jobService.createJob(JOB_MOCK_4);

      await jobService.deleteJobById(JOB_MOCK_1._id);
      const jobs = await jobService.getAllJob({}, {});

      expect(jobs.results.length).toEqual(3);
      await expect(() => jobService.getJobById(JOB_MOCK_1._id)).rejects.toThrow(
        'No such job found'
      );
    });
  });
});
