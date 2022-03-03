import { takeLatest, put, call } from 'redux-saga/effects';
import {
  loginRequestService,
  refreshTokenRequestService,
  logoutRequestService,
} from '../../../services/authServices';
import {
  saveDataLogin,
  setLoading,
  saveRefreshTokenRequest,
  saveLogoutRequest,
} from './actions';
import {
  LOGIN_REQUEST,
  REFRESH_TOKEN_REQUEST,
  LOGOUT_REQUEST,
} from './constants';

function* sendLoginRequest({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const response = yield call(loginRequestService, payload);
    console.log(response);
    if (response.status === 200) {
      resolve(response);
    }
    yield put(setLoading(false));
    yield put(saveDataLogin(response.data));
  } catch (err) {
    console.error(err);
    resolve(null);
  }
}

function* updateToken({ payload }) {
  try {
    const res = yield call(refreshTokenRequestService, payload);
    yield put(saveRefreshTokenRequest(res.data.newToken));
  } catch (error) {
    console.log(error);
  }
}

function* sendLogoutRequest({ payload }) {
  try {
    const res = yield call(logoutRequestService, payload);
    yield put(saveLogoutRequest(res.data));
  } catch (error) {
    console.log(error);
  }
}

export function* sagaLogin() {
  yield takeLatest(LOGIN_REQUEST, sendLoginRequest);
}

export function* updateTokenSaga() {
  yield takeLatest(REFRESH_TOKEN_REQUEST, updateToken);
}

export function* logoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, sendLogoutRequest);
}
