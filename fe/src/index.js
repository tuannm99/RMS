import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import sagas from './redux/sagas';
import { store, persistor, sagaMiddleware } from './utils/configureStore';
import { PersistGate } from 'redux-persist/lib/integration/react';

sagaMiddleware.run(sagas);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
