import { all } from 'redux-saga/effects';

import * as authSagas from '../stores/auth/sagas';
import * as emplSagas from '../stores/employee/sagas';

import * as JobSagas from '../stores/job/sagas';

export default function* () {
  yield all([
    //login
    authSagas.sagaLogin(),
    authSagas.updateTokenSaga(),
    authSagas.logoutSaga(),

    //Job
    JobSagas.SagaGetJobs(),
    //Employee
    emplSagas.residentUser(),
  ]);
}
