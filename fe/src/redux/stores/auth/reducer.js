import {
  SAVE_LOGIN_DATA,
  SET_LOADING,
  SAVE_REFRESH_TOKEN_REQUEST,
  SAVE_LOGOUT_REQUEST,
} from './constants';
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
        localStorage.setItem('token', authority.access.token);
        localStorage.setItem('expires', authority.access.expires);
        localStorage.setItem('refreshToken', authority.refresh.token);
        draft.profile = authority;
        break;
      case SAVE_REFRESH_TOKEN_REQUEST:
        const tokensReducer = action.payload;
        localStorage.setItem('token', tokensReducer.access.token);
        localStorage.setItem('expires', tokensReducer.access.expires);
        localStorage.setItem('refreshToken', tokensReducer.refresh.token);
        draft.profile = tokensReducer;
        break;
      case SAVE_LOGOUT_REQUEST:
        const logout = action.payload;
        localStorage.clear();
        draft.profile = logout;
        break;
      default:
        return state;
    }
  });
}
