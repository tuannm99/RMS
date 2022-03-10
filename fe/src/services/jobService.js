import request from '../utils/request';

const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1';

//get jobs
export function getAllJobs(params) {
  return request(`${BASE_API}/Jobs`, {
    method: 'GET',
    data: params,
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
  });
}

export function deleteJobs(id) {
  return request(`${BASE_API}/Jobs/${id}`, {
    method: 'DELETE',
  });
}
