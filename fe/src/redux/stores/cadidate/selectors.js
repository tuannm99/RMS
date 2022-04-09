import { createSelector } from 'reselect';
import { INIT_STATE } from './states';

const selectState = (state) => state.cadidateReducers || INIT_STATE;

const loading = createSelector(selectState, (state) => state.isLoading);
const loadingInterviews = createSelector(
  selectState,
  (state) => state.loadingInterviews
);
const cadidates = createSelector(selectState, (state) => state.cadidates);
const cadidate = createSelector(selectState, (state) => state.cadidate);
const cadidate_Id = createSelector(selectState, (state) => state.id);
const interviews = createSelector(selectState, (state) => state.interviews);
const visibleAddCadi = createSelector(
  selectState,
  (state) => state.visibleAddCadi
);

export {
  loading,
  cadidates,
  cadidate_Id,
  cadidate,
  interviews,
  loadingInterviews,
  visibleAddCadi,
};
