import request from '../utils/request';

const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1';

//get jobs
export function getAllInterview(params) {
  return request(`${BASE_API}/candidates/interview/all`, {
    method: 'GET',
    params: params,
  });
}
