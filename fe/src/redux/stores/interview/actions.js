import {
  SET_VISIBLE_ID_INTERVIEWER,
  SET_VISIBLE_INTERVIEWER_ID,
  SET_VISIBLE_DATE_INTERVIEWER,
  SET_VISIBLE_NAME_INTERVIEWER,
} from './constants';

export function setInterviewerId(payload) {
  return {
    type: SET_VISIBLE_INTERVIEWER_ID,
    payload,
  };
}

export function setIdIntervier(payload) {
  return {
    type: SET_VISIBLE_ID_INTERVIEWER,
    payload,
  };
}
export function setDateInterview(payload) {
  return {
    type: SET_VISIBLE_DATE_INTERVIEWER,
    payload,
  };
}
export function setNameInterviewer(payload) {
  return {
    type: SET_VISIBLE_NAME_INTERVIEWER,
    payload,
  };
}
