import { createSelector } from 'reselect';
import { INIT_STATE_INTERVIEW } from './states';
const selectInterview = (state) =>
  state.interviewReducers || INIT_STATE_INTERVIEW;

const interviewerId = createSelector(
  selectInterview,
  (state) => state.interviewerId
);
const idInterviewer = createSelector(
  selectInterview,
  (state) => state.idInterviewer
);
const dateInterview = createSelector(
  selectInterview,
  (state) => state.dateInterview
);
const nameInterviewer = createSelector(
  selectInterview,
  (state) => state.nameInterviewer
);

export { interviewerId, idInterviewer, dateInterview, nameInterviewer };
