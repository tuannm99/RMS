import { INIT_STATE } from './states';
import produce from 'immer';

import {
  SET_LOADING,
  SAVE_ALL_LIST_CADIDATE,
  SAVE_CADIDATE,
  SET_ID,
  SAVE_ALL_LIST_INTERVIEW,
  SET_LOADING_INTERVIEWS,
} from './constants';

export default function cadidateReducers(state = INIT_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case SET_LOADING_INTERVIEWS:
        draft.loadingInterviews = action.payload;
        break;
      case SET_ID:
        draft.id = action.payload;
        break;
      case SAVE_ALL_LIST_CADIDATE:
        draft.cadidates = action.payload;
        break;
      case SAVE_CADIDATE:
        draft.cadidate = action.payload;
        break;
      case SAVE_ALL_LIST_INTERVIEW:
        draft.interviews = action.payload;
        break;
      default:
        return state;
    }
  });
}
