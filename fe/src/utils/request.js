import axios from 'axios';

const request = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error) => {
  const { response = {} } = error;

  const { data, status, statusText } = response;
  return { data, status, statusText };
};

request.interceptors.request.use((config) => {
  const tokens = localStorage.getItem('token');
  config.headers.Authorization = tokens ? `Bearer ${tokens}` : '';
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 || status === 404) {
      window.location.pathname = '/login';
      localStorage.clear();
    }

    return error;
  }
);

export default request;
