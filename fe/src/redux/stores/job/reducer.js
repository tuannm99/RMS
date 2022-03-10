import { SET_LOADING, SAVE_JOBS } from './constants';
import produce from 'immer';

import { INIT_STATE_JOB } from './states';
export default function JobReducers(state = INIT_STATE_JOB, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_JOBS:
        draft.jobs = action.payload;
        break;
      default:
        return state;
    }
  });
}
