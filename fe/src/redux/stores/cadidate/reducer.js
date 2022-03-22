import { INIT_STATE } from './states';
import produce from 'immer';

import {
  SET_LOADING,
  SAVE_ALL_LIST_CADIDATE,
  SAVE_CADIDATE,
} from './constants';

export default function cadidateReducers(state = INIT_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_LIST_CADIDATE:
        draft.cadidates = action.payload;
        break;
      case SAVE_CADIDATE:
        draft.cadidate = action.payload;
        break;
      default:
        return state;
    }
  });
}
