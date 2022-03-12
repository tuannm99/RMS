import axios from 'axios';

const url = {
  baseUrl: 'http://rms-fpt.ddns.net:5000/api/v1',
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
