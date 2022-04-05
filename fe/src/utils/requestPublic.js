import axios from 'axios';

const requestPublic = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json' || 'multipart/form-data',
  },
});

const handleError = (error) => {
  const { response = {} } = error;
  const { data, status, statusText } = response;
  return { data, status, statusText };
};

requestPublic.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

requestPublic.interceptors.response.use((response) => {
  return response;
}, handleError);

export default requestPublic;
