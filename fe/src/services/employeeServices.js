import request from '../utils/request';

const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1';
export function getAllUsersServices(params) {
  return request(`${BASE_API}/users`, {
    method: 'GET',
    data: params,
  });
}

export const deleteUsersServices = (id) => {
  return request(`${BASE_API}/users/${id}`, {
    method: 'DELETE',
  });
};

export const getDetailUsersServices = (id) => {
  return request(`${BASE_API}/users/${id}`, {
    method: 'GET',
  });
};

export const updateUsersServices = (id, params) => {
  return request(`${BASE_API}/users/${id}`, {
    method: 'PUT',
    data: params,
  });
};
