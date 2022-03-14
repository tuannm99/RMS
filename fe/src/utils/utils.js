import _get from 'lodash/get';
import { logoutRequestService } from '../services/authServices';

export function dispatchAction(action, ...params) {
  // eslint-disable-next-line no-underscore-dangle
  window.g_app._store.dispatch(action.call(null, ...params));
}

export function hasResponseError(response, action, ...params) {
  const statusCode = _get(response, 'status', null);
  if (statusCode === null || statusCode === undefined || statusCode === '')
    return false;
  const token_refresh = localStorage.getItem('refreshToken');
  if (statusCode === 401 && window.location.pathname !== '/login') {
    logoutRequestService({ refreshToken: token_refresh });
    window.location.pathname = '/login';
    alert('Account expires or error authentication, please login again!');
    localStorage.clear();
  }
  const isValidStatus = statusCode >= 200 && statusCode < 300;
  if (!isValidStatus && action) {
    dispatchAction(action, ...params);
  }

  return !isValidStatus;
}

export const base64String = (previewImg) => {
  return window.btoa(String.fromCharCode(...new Uint8Array(previewImg)));
};
