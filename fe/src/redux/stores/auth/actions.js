import {
  LOGIN_REQUEST,
  SAVE_LOADING,
  SAVE_LOGIN_DATA,
  SET_LOADING,
  LOGOUT_REQUEST,
  SAVE_LOGOUT_REQUEST,
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
export const loginRequest = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: LOGIN_REQUEST, payload, resolve }));

export function saveDataLogin(payload) {
  return {
    type: SAVE_LOGIN_DATA,
    payload,
  };
}

export function logoutRequest(payload) {
  return {
    type: LOGOUT_REQUEST,
    payload,
  };
}

export function saveLogoutRequest(payload) {
  return {
    type: SAVE_LOGOUT_REQUEST,
    payload,
  };
}
