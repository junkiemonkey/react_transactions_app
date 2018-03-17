import { handleActions } from 'redux-actions';
import { GET_USER, LOGIN, LOGOUT, DONE, FAIL } from '../constants';

const initialState = {
  user: null,
  isAuth: false,
  error: '',
};

export default handleActions({
  [GET_USER]: (state, { payload }) => ({
    ...state,
    user: payload,
    isAuth: payload && true,
  }),
  [LOGIN + DONE]: (state, { payload }) => ({
    ...state,
    isAuth: true,
    error: '',
  }),
  [LOGIN + FAIL]: (state, { payload }) => ({
    ...state,
    // user: null,
    // isAuth: false,
    error: payload,
  }),
  [LOGOUT]: state => ({
    ...state,
    user: null,
    isAuth: false,
    error: '',
  }),
}, initialState);
