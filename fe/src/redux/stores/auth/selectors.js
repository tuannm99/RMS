import { createSelector } from 'reselect';
import { INIT_STATE_LOGIN } from './states';
const selectUser = (state) => state.authReducers || INIT_STATE_LOGIN;

const selectLoading = createSelector(selectUser, (state) => state.isLoading);
const selectUserInfor = createSelector(selectUser, (state) => state.profile);

export { selectUserInfor, selectLoading };
