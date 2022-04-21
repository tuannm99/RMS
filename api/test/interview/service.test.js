const dbHandler = require('../index');
const CANDIDATES = require('../fixtures/candidates');
const JOBS = require('../fixtures/jobs');
const INTERVIEWS = require('../fixtures/interviews');

const interviewService = require('../../src/interview/interview.service');
const candidateService = require('../../src/candidate/candidate.service');
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

const CANDIDATE_MOCK_1 = CANDIDATES[0];
const JOB_MOCK_1 = JOBS[0];

const INTERVIEWS_MOCK_1 = INTERVIEWS[0];
const INTERVIEWS_MOCK_2 = INTERVIEWS[1];

describe('Interview service', () => {
  describe('createInterview', () => {
    it('should create intervew successful', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await candidateService.createCandidate(CANDIDATE_MOCK_1);
      const interview = await interviewService.createInterview(INTERVIEWS_MOCK_1);

      expect(interview.duration).toEqual(INTERVIEWS_MOCK_1.duration);
      expect(interview.feedback).toEqual(INTERVIEWS_MOCK_1.feedback);
      expect(interview.stage).toEqual(INTERVIEWS_MOCK_1.stage);
    });
  });

  describe('getAllInterview', () => {
    it('should create intervew successful', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await candidateService.createCandidate(CANDIDATE_MOCK_1);
      const interview = await interviewService.createInterview(INTERVIEWS_MOCK_1);

      expect(interview.duration).toEqual(INTERVIEWS_MOCK_1.duration);
      expect(interview.feedback).toEqual(INTERVIEWS_MOCK_1.feedback);
      expect(interview.stage).toEqual(INTERVIEWS_MOCK_1.stage);
    });
  });

  describe('getInterviewById', () => {
    it('should get all intervew successful', async () => {
      await interviewService.createInterview(INTERVIEWS_MOCK_1);
      const interview = await interviewService.getInterviewById(INTERVIEWS_MOCK_1._id);

      expect(interview.duration).toEqual(INTERVIEWS_MOCK_1.duration);
      expect(interview.feedback).toEqual(INTERVIEWS_MOCK_1.feedback);
      expect(interview.stage).toEqual(INTERVIEWS_MOCK_1.stage);
    });
  });

  describe('editInterviewById', () => {
    it('should edit intervew successful', async () => {
      await interviewService.createInterview(INTERVIEWS_MOCK_1);
      const interview = await interviewService.editInterviewById(INTERVIEWS_MOCK_1._id, {
        duration: 12,
      });

      expect(interview.duration).toEqual(12);
      expect(interview.feedback).toEqual(INTERVIEWS_MOCK_1.feedback);
      expect(interview.stage).toEqual(INTERVIEWS_MOCK_1.stage);
    });
  });

  describe('deleteInterviewById', () => {
    it('should delete intervew successful', async () => {
      await interviewService.createInterview(INTERVIEWS_MOCK_1);

      await interviewService.createInterview(INTERVIEWS_MOCK_2);
      await interviewService.deleteInterviewById(INTERVIEWS_MOCK_1._id);

      await expect(() => interviewService.getInterviewById(INTERVIEWS_MOCK_1._id)).rejects.toThrow(
        'No such interview found'
      );
    });
  });
});
