import { combineReducers } from 'redux';
import authReducers from '../stores/auth/reducer';
import JobReducers from '../stores/job/reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile'],
};
export default function createReducer() {
  const rootReducer = combineReducers({
    authReducers: persistReducer(persistConfig, authReducers),
    JobReducers,
  });
  return rootReducer;
}
