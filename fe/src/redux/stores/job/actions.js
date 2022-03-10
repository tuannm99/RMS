import { SAVE_LOADING, SET_LOADING, GET_JOBS, SAVE_JOBS } from './constants';

export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

export function saveLoading(payload) {
  return {
    type: SAVE_LOADING,
    payload,
  };
}

export function getJobs(payload) {
  return {
    type: GET_JOBS,
    payload,
  };
}

export function saveJobs(payload) {
  return {
    type: SAVE_JOBS,
    payload,
  };
}
