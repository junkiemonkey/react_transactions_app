import { handleActions } from 'redux-actions';
import { FETCH_BANKS, FETCH_DATA, REMOVE_ITEM, ADD_ITEM } from '../constants';

const initalState = {
  itemsList: [],
};

export default handleActions({

  [FETCH_DATA]: (state, { payload }) => ({
    ...state,
    itemsList: payload,
  }),

  [FETCH_BANKS]: (state, { payload }) => ({
    ...state,
    bankList: payload,
  }),

  [ADD_ITEM]: (state, { payload }) => ({
    ...state,
    itemsList: [...state.itemsList, payload],
  }),

  [REMOVE_ITEM]: (state, { payload }) => ({
    ...state,
    itemsList: state.itemsList.filter(_item => _item.id !== payload),
  }),

}, initalState);
