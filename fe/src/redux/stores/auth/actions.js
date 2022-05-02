import {
  LOGIN_REQUEST,
  SAVE_LOADING,
  SAVE_LOGIN_DATA,
  SET_LOADING,
  SET_NAME_USER,
} from './constants';

export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

export function setNameUser(payload) {
  return {
    type: SET_NAME_USER,
    payload,
  };
}

export function saveLoading(payload) {
  return {
    type: SAVE_LOADING,
    payload,
  };
}
export const loginRequest = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: LOGIN_REQUEST, payload, resolve }));

export function saveDataLogin(payload) {
  return {
    type: SAVE_LOGIN_DATA,
    payload,
  };
}
