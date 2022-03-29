import request from '../utils/request';

const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1';

//get jobs
export function getAllInterview(params) {
  return request(`${BASE_API}/candidates/623c22a729a68c1464b42a3e/interview`, {
    method: 'GET',
    params: params,
  });
}
