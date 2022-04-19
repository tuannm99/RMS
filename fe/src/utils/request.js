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

request.interceptors.request.use(async (config) => {
  let expires = localStorage.getItem('expires');
  let refreshToken = localStorage.getItem('refreshToken');
  const now = new Date();
  if (
    now.getTime() + 30000 > moment.utc(expires).toDate().getTime() &&
    expires
  ) {
    await axios
      .post('http://rms-fpt.ddns.net:5000/api/v1/auth/refresh-token', {
        refreshToken: refreshToken,
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          localStorage.setItem('token', res.data.newToken.access.token);
          localStorage.setItem('expires', res.data.newToken.access.expires);
          localStorage.setItem('refreshToken', res.data.newToken.refresh.token);
        }
      })
      .catch(() => {
        axios
          .post('http://rms-fpt.ddns.net:5000/api/v1/auth/logout', {
            refreshToken: refreshToken,
          })
          .then(() => {
            alert(
              'Account expires or error authentication, please login again!'
            );
            window.location.pathname = '/login';
            localStorage.clear();
          });
      });
  }
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
request.interceptors.response.use((response) => {
  return response;
}, handleError);

export default request;
