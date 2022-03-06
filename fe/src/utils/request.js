import axios from 'axios';
import { logoutRequestService } from '../services/authServices';

const request = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use((config) => {
  const tokens = localStorage.getItem('token');
  config.headers.Authorization = tokens ? `Bearer ${tokens}` : '';
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    const token_refresh = localStorage.getItem('refreshToken');
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      logoutRequestService({ refreshToken: token_refresh });
      window.location.pathname = '/login';
      alert('Account expires or error authentication, please login again!');
      localStorage.clear();
    }
    return error.response;
  }
);

export default request;
