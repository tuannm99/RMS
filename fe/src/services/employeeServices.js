import request from '../utils/request';

const BASE_API = 'http://rms-fpt.ddns.net:5000/api/v1';
export function getAllUsersServices(params) {
  return request(`${BASE_API}/users`, {
    method: 'GET',
    params: params,
  });
}

export const deleteUsersServices = (id) => {
  return request(`${BASE_API}/users/${id}`, {
    method: 'DELETE',
    params: id,
  });
};

export const getDetailUsersServices = (id) => {
  return request(`${BASE_API}/users/${id}`, {
    method: 'GET',
  });
};

export const updateUsersServices = (id, body) => {
  return request(`${BASE_API}/users/${id}`, {
    method: 'PUT',
    data: body,
  });
};

export const updateImgUsersServices = (params, body) => {
  return request(`${BASE_API}/users/${params}/avatar`, {
    method: 'PUT',
    data: body,
    params: params,
    responseType: 'form',
  });
};
