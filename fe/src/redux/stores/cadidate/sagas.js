import { takeLatest, call, put } from 'redux-saga/effects';
import { saveAllCadidates, setLoading } from './actions';
import * as services from '../../../services/cadidateServices';
import { GET_ALL_LIST_CADIDATE } from './constants';
import { hasResponseError } from '../../../utils/utils';

function* getAllCadidates({ payload }) {
  try {
    yield put(setLoading(true));
    const response = yield call(services.getAllCadidatesServices, payload);
    if (hasResponseError(response)) {
      return;
    }
    yield put(saveAllCadidates(response.data));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export function* getCadidatesSaga() {
  yield takeLatest(GET_ALL_LIST_CADIDATE, getAllCadidates);
}
