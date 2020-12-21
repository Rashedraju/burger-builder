import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import burgerBuilderReducer from './containers/BurgerBuilder/store/reducer';
import checkoutReducer from './containers/Checkout/ContactData/store/reducer';
import orderReducer from './containers/Orders/store/reducer';
import authReducer from './containers/Auth/store/reducer'; 

const logger = (store) => {
  return (next) => {
    return (action) => {
      const result = next(action);
      return result;
    };
  };
};

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducers = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  checkoutOrder: checkoutReducer,
  orders: orderReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(logger, thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(
  // <React.StrictMode>
  app,
  // </React.StrictMode>,
  document.getElementById('root')
);
// I commented out <React.StrictMode> becouse it's render component two times.
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
