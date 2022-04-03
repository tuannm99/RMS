import { takeLatest, put, call } from 'redux-saga/effects';
import { loginRequestService } from '../../../services/authServices';
import { hasResponseError } from '../../../utils/utils';
import { saveDataLogin, setLoading } from './actions';
import { LOGIN_REQUEST } from './constants';
import { toast } from 'react-toastify';

function* sendLoginRequest({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const response = yield call(loginRequestService, payload);
    if (hasResponseError(response)) {
      yield put(setLoading(false));
      toast.error(`${response.data.message}`);
      return;
    }

    resolve(response.data);
    yield put(saveDataLogin(response.data));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export function* sagaLogin() {
  yield takeLatest(LOGIN_REQUEST, sendLoginRequest);
}
