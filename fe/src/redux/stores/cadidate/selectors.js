import { createSelector } from 'reselect';
import { INIT_STATE } from './states';

const selectState = (state) => state.cadidateReducers || INIT_STATE;

const loading = createSelector(selectState, (state) => state.isLoading);
const cadidates = createSelector(selectState, (state) => state.cadidates);
const cadidate = createSelector(selectState, (state) => state.cadidate);
const cadidate_Id = createSelector(selectState, (state) => state.id);

export { loading, cadidates, cadidate_Id, cadidate };
