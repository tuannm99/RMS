import {
  LOGIN_REQUEST,
  SAVE_LOADING,
  SAVE_LOGIN_DATA,
  SET_LOADING,
  REFRESH_TOKEN_REQUEST,
  SAVE_REFRESH_TOKEN_REQUEST,
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
export function loginRequest(payload) {
  return {
    type: LOGIN_REQUEST,
    payload,
  };
}

export function saveDataLogin(payload) {
  return {
    type: SAVE_LOGIN_DATA,
    payload,
  };
}

export function refreshTokenRequest(payload) {
  return {
    type: REFRESH_TOKEN_REQUEST,
    payload,
  };
}

export function saveRefreshTokenRequest(payload) {
  return {
    type: SAVE_REFRESH_TOKEN_REQUEST,
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
