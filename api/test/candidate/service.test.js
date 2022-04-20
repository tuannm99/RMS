const dbHandler = require('../index');
const CANDIDATES = require('../fixtures/candidates');
const JOBS = require('../fixtures/jobs');

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
const CANDIDATE_MOCK_2 = CANDIDATES[1];
const JOB_MOCK_1 = JOBS[0];

describe('Candidate service', () => {
  describe('createCandidate', () => {
    it('should create candidate successful', async () => {
      const job = await jobService.createJob(JOB_MOCK_1);
      const candidate = await candidateService.createCandidate(CANDIDATE_MOCK_1);

      expect(candidate.jobId).toEqual(job._id);
      expect(candidate.status).toEqual(CANDIDATE_MOCK_1.status);
      expect(candidate.lastName).toEqual(CANDIDATE_MOCK_1.lastName);
      expect(candidate.firstName).toEqual(CANDIDATE_MOCK_1.firstName);
      expect(candidate.fullName).toEqual(CANDIDATE_MOCK_1.fullName);
      expect(candidate.sex).toEqual(CANDIDATE_MOCK_1.sex);
      expect(candidate.phone).toEqual(CANDIDATE_MOCK_1.phone);
      expect(candidate.hyperlink).toEqual(CANDIDATE_MOCK_1.hyperlink);
      expect(candidate.cv).toEqual(CANDIDATE_MOCK_1.cv);
    });

    it('should create candidate failed - job not found', async () => {
      await expect(() => candidateService.createCandidate(CANDIDATE_MOCK_1)).rejects.toThrow(
        'No such job found'
      );
    });

    it('should create candidate failed - name require', async () => {
      await jobService.createJob(JOB_MOCK_1);
      const candidate = { ...CANDIDATE_MOCK_1, firstName: undefined };
      await expect(() => candidateService.createCandidate(candidate)).rejects.toThrow(
        'Candidate validation failed: firstName: Path `firstName` is required.'
      );
    });

    it('should create candidate failed - phone require', async () => {
      await jobService.createJob(JOB_MOCK_1);
      const candidate = { ...CANDIDATE_MOCK_1, phone: undefined };
      await expect(() => candidateService.createCandidate(candidate)).rejects.toThrow(
        'Candidate validation failed: phone: Path `phone` is required.'
      );
    });

    it('should create candidate failed - email require', async () => {
      await jobService.createJob(JOB_MOCK_1);
      const candidate = { ...CANDIDATE_MOCK_1, email: undefined };
      await expect(() => candidateService.createCandidate(candidate)).rejects.toThrow(
        'Candidate validation failed: email: Path `email` is required.'
      );
    });

    it('should create candidate failed - lastName require', async () => {
      await jobService.createJob(JOB_MOCK_1);
      const candidate = { ...CANDIDATE_MOCK_1, lastName: undefined };
      await expect(() => candidateService.createCandidate(candidate)).rejects.toThrow(
        'Candidate validation failed: lastName: Path `lastName` is required.'
      );
    });
  });

  describe('getAllCandidate', () => {
    it('should get candidates successful', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await candidateService.createCandidate(CANDIDATE_MOCK_1);
      await candidateService.createCandidate(CANDIDATE_MOCK_2);

      const candidates = await candidateService.getAllCandidate({}, {});

      expect(candidates.totalResults).toEqual(2);
      expect(candidates.results[0].status).toEqual(CANDIDATE_MOCK_1.status);
      expect(candidates.results[0].lastName).toEqual(CANDIDATE_MOCK_1.lastName);
      expect(candidates.results[0].firstName).toEqual(CANDIDATE_MOCK_1.firstName);
      expect(candidates.results[0].fullName).toEqual(CANDIDATE_MOCK_1.fullName);
      expect(candidates.results[0].sex).toEqual(CANDIDATE_MOCK_1.sex);
      expect(candidates.results[0].phone).toEqual(CANDIDATE_MOCK_1.phone);
      expect(candidates.results[0].hyperlink).toEqual(CANDIDATE_MOCK_1.hyperlink);
      expect(candidates.results[0].cv).toEqual(CANDIDATE_MOCK_1.cv);

      expect(candidates.results[1].status).toEqual(CANDIDATE_MOCK_2.status);
      expect(candidates.results[1].lastName).toEqual(CANDIDATE_MOCK_2.lastName);
      expect(candidates.results[1].firstName).toEqual(CANDIDATE_MOCK_2.firstName);
      expect(candidates.results[1].fullName).toEqual(CANDIDATE_MOCK_2.fullName);
      expect(candidates.results[1].sex).toEqual(CANDIDATE_MOCK_2.sex);
      expect(candidates.results[1].phone).toEqual(CANDIDATE_MOCK_2.phone);
      expect(candidates.results[1].hyperlink).toEqual(CANDIDATE_MOCK_2.hyperlink);
      expect(candidates.results[1].cv).toEqual(CANDIDATE_MOCK_2.cv);
    });
  });

  describe('getCandidateById', () => {
    it('should get candidate failed - wrong id', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await candidateService.createCandidate(CANDIDATE_MOCK_1);

      await expect(() => candidateService.getCandidateById(CANDIDATE_MOCK_2._id)).rejects.toThrow(
        'No such candidate found'
      );
    });

    it('should get candidate successful', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await candidateService.createCandidate(CANDIDATE_MOCK_1);
      const candidate = await candidateService.getCandidateById(CANDIDATE_MOCK_1._id);

      expect(candidate.status).toEqual(CANDIDATE_MOCK_1.status);
      expect(candidate.lastName).toEqual(CANDIDATE_MOCK_1.lastName);
      expect(candidate.firstName).toEqual(CANDIDATE_MOCK_1.firstName);
      expect(candidate.fullName).toEqual(CANDIDATE_MOCK_1.fullName);
      expect(candidate.sex).toEqual(CANDIDATE_MOCK_1.sex);
      expect(candidate.phone).toEqual(CANDIDATE_MOCK_1.phone);
      expect(candidate.hyperlink).toEqual(CANDIDATE_MOCK_1.hyperlink);
      expect(candidate.cv).toEqual(CANDIDATE_MOCK_1.cv);
    });
  });

  describe('editCandidateById', () => {
    it('should edit candidate successful', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await candidateService.createCandidate(CANDIDATE_MOCK_1);
      const candidate = await candidateService.editCandidateById(CANDIDATE_MOCK_1._id, {
        status: 'published',
        sex: 'other',
        hyperlink: 'ahihi',
      });

      expect(candidate.status).not.toEqual(CANDIDATE_MOCK_1.status);
      expect(candidate.sex).not.toEqual(CANDIDATE_MOCK_1.sex);
      expect(candidate.hyperlink).not.toEqual(CANDIDATE_MOCK_1.hyperlink);

      expect(candidate.cv).toEqual(CANDIDATE_MOCK_1.cv);
      expect(candidate.lastName).toEqual(CANDIDATE_MOCK_1.lastName);
      expect(candidate.firstName).toEqual(CANDIDATE_MOCK_1.firstName);
      expect(candidate.fullName).toEqual(CANDIDATE_MOCK_1.fullName);
      expect(candidate.phone).toEqual(CANDIDATE_MOCK_1.phone);
      expect(candidate.sex).toEqual('other');
      expect(candidate.status).toEqual('published');
      expect(candidate.hyperlink).toEqual('ahihi');
    });
  });

  describe('deleteCandidateById', () => {
    it('should delete candidate successful', async () => {
      await jobService.createJob(JOB_MOCK_1);
      await candidateService.createCandidate(CANDIDATE_MOCK_1);
      await candidateService.createCandidate(CANDIDATE_MOCK_2);

      await candidateService.deleteCandidateById(CANDIDATE_MOCK_1._id);
      const candidates = await candidateService.getAllCandidate({}, {});

      expect(candidates.totalResults).toEqual(1);
      await expect(() => candidateService.getCandidateById(CANDIDATE_MOCK_1._id)).rejects.toThrow(
        'No such candidate found'
      );
    });
  });
});
