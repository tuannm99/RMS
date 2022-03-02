import { combineReducers } from 'redux';
import authReducers from '../stores/auth/reducer';
export default function createReducer() {
  const rootReducer = combineReducers({ authReducers });
  return rootReducer;
}
