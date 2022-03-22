import { SET_JOBID } from './constants';
import produce from 'immer';

import { INIT_STATE_LOGIN } from './states';
export default function jobReducers(state = INIT_STATE_LOGIN, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_JOBID:
        draft.jobID = action.payload;
        break;
      default:
        return state;
    }
  });
}
