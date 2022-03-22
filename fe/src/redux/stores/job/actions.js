import { SET_JOBID } from './constants';

export function setJobId(payload) {
  return {
    type: SET_JOBID,
    payload,
  };
}
