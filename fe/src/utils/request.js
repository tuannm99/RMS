import axios from 'axios';
import moment from 'moment';
import { hasResponseError } from './utils';

/**
 * set up axios configuation
 */
const request = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json' || 'multipart/form-data',
  },
});

let refreshTokenRequest = null;
let countDown = 0;
request.interceptors.request.use(async (config) => {
  let tokens = localStorage.getItem('token');
  let expires = localStorage.getItem('expires');
  let refreshToken = localStorage.getItem('refreshToken');

  const now = new Date();
  if (
    // 20 second token expires
    now.getTime() + 20000 > moment.utc(expires).toDate().getTime() &&
    expires
  ) {
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : axios.post('http://rms-fpt.ddns.net:5000/api/v1/auth/refresh-token', {
          refreshToken: refreshToken,
        });

    try {
      const res = await refreshTokenRequest;
      // reset token request for the next expiration
      refreshTokenRequest = null;
      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem('token', res.data.newToken.access.token);
        localStorage.setItem('expires', res.data.newToken.access.expires);
        localStorage.setItem('refreshToken', res.data.newToken.refresh.token);
        config.headers.Authorization = `Bearer ${res.data.newToken.access.token}`;
      }
    } catch (e) {
      // a dumb way to handle alert when multiple response error occur
      if (countDown === 0) {
        axios.post('http://rms-fpt.ddns.net:5000/api/v1/auth/logout', {
          refreshToken: refreshToken,
        });
        alert('Account expires or error authentication, please login again!');
        window.location.pathname = '/login';
        localStorage.clear();
        countDown = 2;
      }
      setInterval(() => {
        if (countDown !== 0) {
          countDown--;
        }
      }, 1000);
    }
    return config;
  } else {
    config.headers.Authorization = tokens ? `Bearer ${tokens}` : '';
    return config;
  }
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
