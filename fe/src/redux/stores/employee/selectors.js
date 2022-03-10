import { createSelector } from 'reselect';
import { INIT_STATE_USER_RESIDENT } from './states';

const selectUser = (state) =>
  state.userResidentReducers || INIT_STATE_USER_RESIDENT;

const selectLoading = createSelector(selectUser, (state) => state.isLoading);
const selectDataUser = createSelector(selectUser, (state) => state.dataUser);

export { selectLoading, selectDataUser };
