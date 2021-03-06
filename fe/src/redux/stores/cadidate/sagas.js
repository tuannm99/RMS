import { takeLatest, call, put } from 'redux-saga/effects';
import {
  saveAllCadidates,
  setLoading,
  saveCadidate,
  saveAllInterviews,
  setLoadingInterviews,
  setLoadingCadidate,
} from './actions';
import * as services from '../../../services/cadidateServices';
import {
  GET_ALL_LIST_CADIDATE,
  GET_CADIDATE,
  EDIT_CADIDATE,
  GET_ALL_LIST_INTERVIEW,
} from './constants';
import { hasResponseError } from '../../../utils/utils';
import { toast } from 'react-toastify';

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

function* getAllInterviews({ payload }) {
  try {
    yield put(setLoadingInterviews(true));
    const response = yield call(services.getAllInterviewsServices, payload);
    if (hasResponseError(response)) {
      return;
    }
    yield put(saveAllInterviews(response.data.results));
    yield put(setLoadingInterviews(false));
  } catch (error) {
    console.log(error);
  }
}

function* getCadidate({ payload }) {
  try {
    yield put(setLoadingCadidate(true));
    const response = yield call(services.getDetailCadidateServices, payload);
    if (hasResponseError(response)) {
      return;
    }
    yield put(saveCadidate(response.data));
    yield put(setLoadingCadidate(false));
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
}

function* editCadidate({ payload }) {
  try {
    const response = yield call(services.updateCadidateServices, payload);
    if (hasResponseError(response)) {
      toast.error(response.data.message);
      return;
    }
    console.log(response.data);
    toast.success('Edit success!');
    yield put(saveCadidate(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* getCadidatesSaga() {
  yield takeLatest(GET_ALL_LIST_CADIDATE, getAllCadidates);
}

export function* getInterviewsSaga() {
  yield takeLatest(GET_ALL_LIST_INTERVIEW, getAllInterviews);
}

export function* getCadidateSaga() {
  yield takeLatest(GET_CADIDATE, getCadidate);
}

export function* editCadidateSaga() {
  yield takeLatest(EDIT_CADIDATE, editCadidate);
}
