import { SET_JOBID, SET_VISIBLE_ADD_JOB } from './constants';

export function setJobId(payload) {
  return {
    type: SET_JOBID,
    payload,
  };
}

export function setVisibleAddJob(payload) {
  return {
    type: SET_VISIBLE_ADD_JOB,
    payload,
  };
}
