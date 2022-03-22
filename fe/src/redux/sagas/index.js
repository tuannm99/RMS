import { all } from 'redux-saga/effects';

import * as authSagas from '../stores/auth/sagas';

import * as cadidateSagas from '../stores/cadidate/sagas';

export default function* () {
  yield all([
    //login
    authSagas.sagaLogin(),
    authSagas.updateTokenSaga(),
    authSagas.logoutSaga(),

    //cadidate
    cadidateSagas.getCadidatesSaga(),
  ]);
}
