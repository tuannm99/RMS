import { createSelector } from 'reselect';
import { INIT_STATE_LOGIN } from './states';
const selectJob = (state) => state.jobReducers || INIT_STATE_LOGIN;

const selectJobId = createSelector(selectJob, (state) => state.jobID);

export { selectJobId };
