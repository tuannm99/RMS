import { takeLatest, put, call } from 'redux-saga/effects';
import {
  loginRequestService,
  refreshTokenRequestService,
} from '../../../services/authServices';
import { saveDataLogin, setLoading } from './actions';
import { LOGIN_REQUEST, REFRESH_TOKEN_REQUEST } from './constants';

function* sendLoginRequest({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const response = yield call(loginRequestService, payload);
    console.log(response.data);
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
    yield put(saveDataLogin(res));
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
