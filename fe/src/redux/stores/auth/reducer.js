import {
  SAVE_LOADING,
  SAVE_LOGIN_DATA,
  SET_LOADING,
  REFRESH_TOKEN_REQUEST,
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
        localStorage.setItem('tokens', JSON.stringify(authority.tokens));
        draft.profile = authority;
        break;
      case REFRESH_TOKEN_REQUEST:
        const tokens = action.payload;
        localStorage.setItem('tokens', JSON.stringify(authority.tokens));
        draft.profile = tokens;
        break;
      default:
        return state;
    }
  });
}
