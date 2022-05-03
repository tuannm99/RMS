import request from '../utils/request';

const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1';

//get interview
export function getAllInterview(params) {
  return request(`${BASE_API}/candidates/interview/all`, {
    method: 'GET',
    params: params,
  });
}

//get data chart department
export function getDataChart() {
  return request(`${BASE_API}/chart/101`, {
    method: 'GET',
  });
}

//get data chart sex
export function getDataChartSex() {
  return request(`${BASE_API}/chart/102`, {
    method: 'GET',
  });
}

//get data chart role
export function getDataChartRole() {
  return request(`${BASE_API}/chart/103`, {
    method: 'GET',
  });
}

//get data chart status
export function getDataChartStatus() {
  return request(`${BASE_API}/chart/104`, {
    method: 'GET',
  });
}

//snapshot
export function getDataCountCandidate() {
  return request(`${BASE_API}/chart/countCandidate`, {
    method: 'GET',
  });
}

//snapshot
export function getDataCountRejected() {
  return request(`${BASE_API}/chart/countCandidateRejected`, {
    method: 'GET',
  });
}

//snapshot
export function getDataCountApproved() {
  return request(`${BASE_API}/chart/countCandidateApproved`, {
    method: 'GET',
  });
}
