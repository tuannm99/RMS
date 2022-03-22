import request from '../utils/request';

const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1';

/**
 * create request get all list user
 * @param {*} params
 * @returns
 */
export function getAllUsersServices(params) {
  return request(`${BASE_API}/users`, {
    method: 'GET',
    params: params,
  });
}

/**
 * create request remove user
 * @param {*} id
 * @returns
 */
export const deleteUsersServices = (id) => {
  return request(`${BASE_API}/users/${id}`, {
    method: 'DELETE',
    params: id,
  });
};

/**
 * create requst get detail user
 * @param {*} id
 * @returns
 */
export const getDetailUsersServices = (id) => {
  return request(`${BASE_API}/users/${id}`, {
    method: 'GET',
  });
};

/**
 * create request update user
 * @param {*} id
 * @param {*} body
 * @returns
 */
export const updateUsersServices = (id, body) => {
  return request(`${BASE_API}/users/${id}`, {
    method: 'PUT',
    data: body,
  });
};

/**
 * create request update image
 * @param {*} params
 * @param {*} body
 * @returns
 */
export const updateImgUsersServices = (params, body) => {
  return request(`${BASE_API}/users/${params}/avatar`, {
    method: 'PUT',
    data: body,
    params: params,
    responseType: 'form',
  });
};