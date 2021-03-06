import axios from 'axios';
import { createAction } from 'redux-actions';
import {
  FETCH_DATA,
  FETCH_BANKS,
  ADD_ITEM,
  REMOVE_ITEM,
  GET_USER,
  LOGIN,
  LOGOUT,
} from '../constants';

const fetch = createAction(FETCH_DATA);
const getBanks = createAction(FETCH_BANKS);
export const addItem = createAction(ADD_ITEM);
export const removeItem = createAction(REMOVE_ITEM);
export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
const getUser = createAction(GET_USER);


export const fetchTransactions = () => dispatch => (
  axios.get('fixtures/ok.json')
    .then(({ data }) => {
      dispatch(fetch(data));
      return data;
    })
    .catch(e => console.error(e))
);

export const fetchBanks = () => dispatch => (
  axios.get('fixtures/banks.json')
    .then(({ data }) => dispatch(getBanks(data)))
    .catch(e => console.error(e))
);

export const fetchUser = () => dispatch => (
  axios.get('fixtures/user.json')
    .then(({ data }) => {
      dispatch(getUser(data));
      return data;
    })
    .catch(e => console.error(e))
);

