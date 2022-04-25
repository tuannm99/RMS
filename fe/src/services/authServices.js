import request from '../utils/request';
import requestPublic from '../utils/requestPublic';
const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1/auth';
const BASE_API_USER = 'http://rms-fpt.ddns.net:5000/api/v1/users';

//create request login
export function loginRequestService(params) {
  return requestPublic(`${BASE_API}/login`, {
    method: 'POST',
    data: params,
  });
}

//create request login
export function forgotRequestService(params) {
  return requestPublic(`${BASE_API}/forgot-pass`, {
    method: 'GET',
    params: params,
  });
}

//create request changePass
export function changePassRequestService(body, id) {
  return requestPublic(`${BASE_API_USER}/${id}/change-password`, {
    method: 'PUT',
    data: body,
  });
}

//create request register
export function registerRequestService(params) {
  return request(`${BASE_API}/register`, {
    method: 'POST',
    data: params,
  });
}

//create request logout
export function logoutRequestService(params) {
  return request(`${BASE_API}/logout`, {
    method: 'post',
    data: params,
  });
}

//create request refresh token
export function refreshTokenRequestService(params) {
  return request(`${BASE_API}/refresh-token`, {
    method: 'POST',
    data: params,
  });
}
