//configureStore.js
import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reducers from '../redux/reducers'; // giá trị trả về từ combineReducers

const sagaMiddleware = createSagaMiddleware();
let store = createStore(Reducers(), applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);

export { store, persistor, sagaMiddleware };
