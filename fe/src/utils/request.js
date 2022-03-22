import axios from 'axios';

/**
 * set up axios configuation
 */
const request = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json' || 'multipart/form-data',
  },
});

request.interceptors.request.use((config) => {
  const tokens = localStorage.getItem('token');
  config.headers.Authorization = tokens ? `Bearer ${tokens}` : '';
  return config;
});

const handleError = (error) => {
  const { response = {} } = error;
  const { data, status, statusText } = response;
  return { data, status, statusText };
};
request.interceptors.response.use((response) => {
  return response;
}, handleError);

export default request;
