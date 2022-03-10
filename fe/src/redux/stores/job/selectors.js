import { createSelector } from 'reselect';
import { INIT_STATE_JOB } from './states';

const selectJob = (state) => state.JobReducers || INIT_STATE_JOB;

const selectLoading = createSelector(selectJob, (state) => state.isLoading);
const selectJobs = createSelector(selectJob, (state) => state.jobs);

export { selectJobs, selectLoading };
