import request from '../utils/request';

const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1';

//get jobs
export function getAllJobs(params) {
  return request(`${BASE_API}/Jobs`, {
    method: 'GET',
    params: params,
  });
}

//get jobs title
export function getAllTitleJobs(params) {
  return request(`${BASE_API}/Jobs/short/title`, {
    method: 'GET',
    params: params,
  });
}

//get job detail
export function getJobsDetail(id) {
  return request(`${BASE_API}/Jobs/${id}`, {
    method: 'GET',
  });
}

export function createJobs(body) {
  return request(`${BASE_API}/jobs`, {
    method: 'POST',
    data: body,
  });
}

export function updateJobs(id, body) {
  return request(`${BASE_API}/Jobs/${id}`, {
    method: 'PUT',
    data: body,
    params: id,
  });
}

export function deleteJobs(id) {
  return request(`${BASE_API}/Jobs/${id}`, {
    method: 'DELETE',
  });
}
