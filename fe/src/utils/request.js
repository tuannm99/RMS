import axios from 'axios';
import moment from 'moment';
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
  config.headers.Authorization = localStorage.getItem('token')
    ? `Bearer ${localStorage.getItem('token')}`
    : '';
  return config;
});

const handleError = (error) => {
  const { response = {} } = error;
  const { data, status, statusText } = response;
  return { data, status, statusText };
};
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config } = error;
    const refreshToken = localStorage.getItem('refreshToken');
    if (response.status !== 401) {
      return handleError;
    }
    return axios
      .post('http://rms-fpt.ddns.net:5000/api/v1/auth/refresh-token', {
        refreshToken: refreshToken,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.newToken.access.token);
        localStorage.setItem('refreshToken', res.data.newToken.refresh.token);
      })
      .then(() => {
        config.headers.Authorization = localStorage.getItem('token')
          ? `Bearer ${localStorage.getItem('token')}`
          : '';
        return request(config);
      })
      .catch((error) => {
        if (error.response.status !== 429) {
          axios
            .post('http://rms-fpt.ddns.net:5000/api/v1/auth/logout', {
              refreshToken: refreshToken,
            })
            .then(() => {
              localStorage.clear();
              window.location.pathname = '/login';
              alert('Authentication, please login again!');
            })
            .catch((error) => {
              if (error.response.status !== 429) {
                localStorage.clear();
                window.location.pathname = '/login';
                alert('Authentication, please login again!');
              }
            });
        }
      });
  }
);

export default request;
