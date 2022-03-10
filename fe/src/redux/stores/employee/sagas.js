import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getAllUsersServices,
  updateUsersServices,
} from '../../../services/employeeServices';
import { hasResponseError } from '../../../utils/utils';
import { saveAllUser, saveLoading } from './actions';
import { GET_ALL_USER, UPDATE_USER_RESIDENT } from './constants';
import { CloseOutlined } from '@ant-design/icons';
import { notification } from 'antd';

function* getListUserResident({ payload }) {
  try {
    saveLoading(true);
    const response = yield call(getAllUsersServices, payload);
    console.log(response.data);
    if (hasResponseError(response)) {
      console.log(response);
      yield put(saveLoading(false));
      notification.open({
        message: `${response.data.message} `,
        placement: 'topRight',
        icon: <CloseOutlined style={{ color: 'green' }} />,
        style: { zIndex: '10000000' },
      });
      return;
    }
    yield put(saveAllUser(response.data.results));
    saveLoading(false);
  } catch (error) {
    console.log(error);
  }
}

export function* residentUser() {
  yield takeLatest(GET_ALL_USER, getListUserResident);
}

function* updateUserResident({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(updateUsersServices, payload);
    resolve(response);
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(saveLoading(false));
  }
}
export function* createUser() {
  yield takeLatest(UPDATE_USER_RESIDENT, updateUserResident);
}
