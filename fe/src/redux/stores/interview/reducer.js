import {
  SET_VISIBLE_ID_INTERVIEWER,
  SET_VISIBLE_INTERVIEWER_ID,
  SET_VISIBLE_DATE_INTERVIEWER,
  SET_VISIBLE_NAME_INTERVIEWER,
} from './constants';
import produce from 'immer';

import { INIT_STATE_INTERVIEW } from './states';
export default function interviewReducers(
  state = INIT_STATE_INTERVIEW,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_VISIBLE_ID_INTERVIEWER:
        draft.idInterviewer = action.payload;
        break;
      case SET_VISIBLE_INTERVIEWER_ID:
        draft.interviewerId = action.payload;
        break;
      case SET_VISIBLE_DATE_INTERVIEWER:
        draft.dateInterview = action.payload;
        break;
      case SET_VISIBLE_NAME_INTERVIEWER:
        draft.nameInterviewer = action.payload;
        break;
      default:
        return state;
    }
  });
}
