import request from '../utils/request';

const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1';

//get jobs
export function getAllPublishJob(params) {
  return request(`${BASE_API}/careers/jobs`, {
    method: 'GET',
    params: params,
  });
}
//get job detail
export function getPublishJobDetail(id) {
  return request(`${BASE_API}/careers/jobs/${id}`, {
    method: 'GET',
  });
}
