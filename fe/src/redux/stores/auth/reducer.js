import { SAVE_LOGIN_DATA, SET_LOADING } from './constants';
import produce from 'immer';

import { INIT_STATE_LOGIN } from './states';
export default function authReducers(state = INIT_STATE_LOGIN, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_LOGIN_DATA:
        const authority = action.payload;
        localStorage.setItem('token', authority.tokens.access.token);
        localStorage.setItem('expires', authority.tokens.access.expires);
        localStorage.setItem('refreshToken', authority.tokens.refresh.token);
        draft.profile = authority.user;
        break;
      default:
        return state;
    }
  });
}
