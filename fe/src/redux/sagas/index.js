import { all } from 'redux-saga/effects';

import * as authSagas from '../stores/auth/sagas';
import * as emplSagas from '../stores/employee/sagas';

export default function* () {
  yield all([
    //login
    authSagas.sagaLogin(),
    authSagas.updateTokenSaga(),
    authSagas.logoutSaga(),

    //Employee
    emplSagas.residentUser(),
  ]);
}
