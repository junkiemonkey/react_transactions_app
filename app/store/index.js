import { compose, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import dataProcess from '../middlewares/dataProcess';

const { env: { NODE_ENV } } = process;

function generateCompose(...middlewares) {
  if (NODE_ENV === 'development') {
    return composeWithDevTools(...middlewares);
  }
  return compose(...middlewares);
}

export default createStore(reducers, {}, generateCompose(applyMiddleware(thunk, dataProcess)));
