import _get from 'lodash/get';
import axios from 'axios';

/**
 * get action resquest
 * @param {*} action
 * @param  {...any} params
 */
export function dispatchAction(action, ...params) {
  // eslint-disable-next-line no-underscore-dangle
  window.g_app._store.dispatch(action.call(null, ...params));
}

/**
 * Check error when send 1 request
 * @param {*} response
 * @param {*} action
 * @param  {...any} params
 * @returns
 */
export function hasResponseError(response, action, ...params) {
  const statusCode = _get(response, 'status', null);
  if (statusCode === null || statusCode === undefined || statusCode === '')
    return false;
  const isValidStatus = statusCode >= 200 && statusCode < 300;
  if (!isValidStatus && action) {
    dispatchAction(action, ...params);
  }

  return !isValidStatus;
}

export function hasResponseErrorPublic(response, action, ...params) {
  const statusCode = _get(response, 'status', null);
  if (statusCode === null || statusCode === undefined || statusCode === '')
    return false;

  const isValidStatus = statusCode >= 200 && statusCode < 300;
  if (!isValidStatus && action) {
    dispatchAction(action, ...params);
  }

  return !isValidStatus;
}

/**
 * convert from buffer to base64
 * @param {*} buffer
 * @returns
 */
export const base64String = (buffer) => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

/**
 * convert from file to base64
 * @param {*} file
 * @returns
 */
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

export const imgURL = 'http://rms-fpt.ddns.net:5000/';
