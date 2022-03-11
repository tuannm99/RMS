//configureStore.js
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducers from '../redux/stores/auth/reducer'; // giá trị trả về từ combineReducers

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducers);
const sagaMiddleware = createSagaMiddleware();
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);

export { store, persistor, sagaMiddleware };
