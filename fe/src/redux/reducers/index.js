import { combineReducers } from 'redux';
import authReducers from '../stores/auth/reducer';
import JobReducers from '../stores/job/reducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    authReducers,
    JobReducers,
  });
  return rootReducer;
}
