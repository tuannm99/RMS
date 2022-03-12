import request from '../utils/request';
const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1/auth';

//login
export function loginRequestService(params) {
  return request(`${BASE_API}/login`, {
    method: 'POST',
    data: params,
  });
}

//register
export function registerRequestService(params) {
  return request(`${BASE_API}/register`, {
    method: 'POST',
    data: params,
  });
}

//logout
export function logoutRequestService(params) {
  return request(`${BASE_API}/logout`, {
    method: 'POST',
    data: params,
  });
}

//refresh token
export function refreshTokenRequestService(params) {
  return request(`${BASE_API}/refresh-token`, {
    method: 'POST',
    data: params,
  });
}
