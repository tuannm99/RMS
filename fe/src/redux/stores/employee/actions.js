import {
  SET_LOADING,
  SAVE_LOADING,
  GET_ALL_USER,
  SAVE_ALL_USER,
  GET_DETAIL_USER,
  UPDATE_USER_RESIDENT,
} from './constants';

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

export function getAllUserRequest(payload) {
  return {
    type: GET_ALL_USER,
    payload,
  };
}

export function getDetailUserRequest(payload) {
  return {
    type: GET_DETAIL_USER,
    payload,
  };
}

export function saveAllUser(payload) {
  return {
    type: SAVE_ALL_USER,
    payload,
  };
}

export const asyncUpdateUserResident = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: UPDATE_USER_RESIDENT, payload, resolve })
  );
