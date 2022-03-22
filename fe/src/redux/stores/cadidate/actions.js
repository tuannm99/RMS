import {
  SET_LOADING,
  GET_ALL_LIST_CADIDATE,
  EDIT_CADIDATE,
  GET_CADIDATE,
  SAVE_ALL_LIST_CADIDATE,
  SAVE_CADIDATE,
} from './constants';

export function setLoading(payload) {
  return {
    type: SET_LOADING,
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
