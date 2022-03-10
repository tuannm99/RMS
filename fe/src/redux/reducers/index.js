import { combineReducers } from 'redux';
import authReducers from '../stores/auth/reducer';
import userResidentReducers from '../stores/employee/reducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    authReducers,
    userResidentReducers,
  });
  return rootReducer;
}
