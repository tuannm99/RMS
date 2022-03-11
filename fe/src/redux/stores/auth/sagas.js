import { takeLatest, put, call } from 'redux-saga/effects';
import {
  loginRequestService,
  refreshTokenRequestService,
  logoutRequestService,
} from '../../../services/authServices';
import { hasResponseError } from '../../../utils/utils';
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
import { CloseOutlined } from '@ant-design/icons';
import { notification } from 'antd';

function* sendLoginRequest({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const response = yield call(loginRequestService, payload);
    if (hasResponseError(response)) {
      yield put(setLoading(false));
      notification.open({
        message: `${response.data.message} `,
        placement: 'topRight',
        icon: <CloseOutlined style={{ color: 'green' }} />,
        style: { zIndex: '10000000' },
      });
      return;
    }
    resolve(response.data.user);
    yield put(saveDataLogin(response.data));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* updateToken({ payload }) {
  try {
    const res = yield call(refreshTokenRequestService, payload);
    if (hasResponseError(res)) {
      return;
    }
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
