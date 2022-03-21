import { combineReducers } from 'redux';
import authReducers from '../stores/auth/reducer';
import jobReducers from '../stores/job/reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile'],
};
const persistJobConfig = {
  key: 'job',
  storage,
};
export default function createReducer() {
  const rootReducer = combineReducers({
    authReducers: persistReducer(persistConfig, authReducers),
    jobReducers: persistReducer(persistJobConfig, jobReducers),
  });
  return rootReducer;
}
