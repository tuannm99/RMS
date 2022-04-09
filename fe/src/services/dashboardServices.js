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
