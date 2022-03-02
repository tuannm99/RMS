import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './redux/sagas';
import reducers from './redux/reducers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers(), {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
