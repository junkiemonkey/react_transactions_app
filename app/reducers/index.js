import { combineReducers } from 'redux';
import transactions from './transactions.reducer';
import auth from './auth.reducer';

export default combineReducers({
  transactions, auth,
});
