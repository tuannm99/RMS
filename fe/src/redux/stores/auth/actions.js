import {
  LOGIN_REQUEST,
  SAVE_LOADING,
  SAVE_LOGIN_DATA,
  SET_LOADING,
  REFRESH_TOKEN_REQUEST,
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

export const saveDataLogin = (payload) => ({
  type: SAVE_LOGIN_DATA,
  payload,
});

export function refreshTokenRequest(payload) {
  return {
    type: REFRESH_TOKEN_REQUEST,
    payload,
  };
}
