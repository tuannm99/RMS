import request from '../utils/request';

const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1';

/**
 * create request get all list Cadidate
 * @param {*} params
 * @returns
 */
export function getAllCadidatesServices(params) {
  return request(`${BASE_API}/candidates`, {
    method: 'GET',
    params: params,
  });
}

/**
 * create request remove Cadidate
 * @param {*} id
 * @returns
 */
export const deleteCadidateServices = (id) => {
  return request(`${BASE_API}/candidates/${id}`, {
    method: 'DELETE',
    params: id,
  });
};

/**
 * create requst get detail Cadidate
 * @param {*} id
 * @returns
 */
export const getDetailCadidateServices = (id) => {
  return request(`${BASE_API}/candidates/${id}`, {
    method: 'GET',
  });
};

/**
 * create request update Cadidate
 * @param {*} id
 * @param {*} body
 * @returns
 */
export const updateCadidateServices = (id, body) => {
  return request(`${BASE_API}/candidates/${id}`, {
    method: 'PUT',
    params: id,
    data: body,
  });
};

/**
 * create request add Cadidate
 * @param {*} body
 * @returns
 */
export const addCadidateServices = (body) => {
  return request(`${BASE_API}/candidates`, {
    method: 'POST',
    data: body,
  });
};
