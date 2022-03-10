import { takeLatest, put, call } from 'redux-saga/effects';
import { getJobsRequestService } from '../../../services/jobService';
import { hasResponseError } from '../../../utils/utils';
import { toast } from 'react-toastify';
import { setLoading, saveJobs, getJobs } from './actions';

import { GET_JOBS } from './constants';

function* getJobsRequest({ payload }) {
  try {
    yield put(setLoading(true));
    const res = yield call(getJobsRequestService, payload);
    if (hasResponseError(res)) {
      console.log(res);
      yield put(setLoading(false));
      toast.error(`${res.data.message} `, {
        autoClose: 3000,
      });
      return;
    }
    yield put(saveJobs(res.data));
    yield put(setLoading(false));
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

export function* SagaGetJobs() {
  yield takeLatest(GET_JOBS, getJobsRequest);
}
