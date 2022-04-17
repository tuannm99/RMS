import {
  SET_LOADING,
  GET_ALL_LIST_CADIDATE,
  EDIT_CADIDATE,
  GET_CADIDATE,
  SAVE_ALL_LIST_CADIDATE,
  SAVE_CADIDATE,
  SET_ID,
  GET_ALL_LIST_INTERVIEW,
  SAVE_ALL_LIST_INTERVIEW,
  SET_LOADING_INTERVIEWS,
  SET_VISIBLE_ADD_CANDIDATE,
  SET_CHECK_TOKEN,
  SET_LOADING_CADIDATE,
} from './constants';

export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

export function setLoadingCadidate(payload) {
  return {
    type: SET_LOADING_CADIDATE,
    payload,
  };
}

export function setCheckToken(payload) {
  return {
    type: SET_CHECK_TOKEN,
    payload,
  };
}

export function setVisibleAddCandi(payload) {
  return {
    type: SET_VISIBLE_ADD_CANDIDATE,
    payload,
  };
}

export function setLoadingInterviews(payload) {
  return {
    type: SET_LOADING_INTERVIEWS,
    payload,
  };
}

export function setId(payload) {
  return {
    type: SET_ID,
    payload,
  };
}

export function getAllCadidates(payload) {
  return {
    type: GET_ALL_LIST_CADIDATE,
    payload,
  };
}

export function saveAllCadidates(payload) {
  return {
    type: SAVE_ALL_LIST_CADIDATE,
    payload,
  };
}

export function getAllInterviews(payload) {
  return {
    type: GET_ALL_LIST_INTERVIEW,
    payload,
  };
}

export function saveAllInterviews(payload) {
  return {
    type: SAVE_ALL_LIST_INTERVIEW,
    payload,
  };
}

export function editCadidate(payload) {
  return {
    type: EDIT_CADIDATE,
    payload,
  };
}
export function getCadidate(payload) {
  return {
    type: GET_CADIDATE,
    payload,
  };
}
export function saveCadidate(payload) {
  return {
    type: SAVE_CADIDATE,
    payload,
  };
}
