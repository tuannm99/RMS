import axios from 'axios';

const url = {
  baseUrl: 'https://61d98462ce86530017e3cb2e.mockapi.io',
  Jobs: '/Jobs',
};

const intance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
});

const api = {
  url,
  intance,
  get: intance.get,
  post: intance.post,
  put: intance.put,
  delete: intance.delete,
};
export default api;
