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

export const base64String = (buffer) => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export const convertFileToBase64 = (file) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL = '';
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};
