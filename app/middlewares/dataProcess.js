import { ADD_ITEM, FETCH_DATA, REMOVE_ITEM, GET_USER, LOGIN, LOGOUT, DONE, FAIL } from '../constants';
import { user } from '../settings';
import {
  getItemsFromStorage,
  addItemToStorage,
  deleteItemFromStorage,
  getUniqeId,
  getUserFromStorage,
  saveUserToStorage,
  removeUserFromStorage,
} from '../utils';

export default store => next => action => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DATA: next({ type, payload: getItemsFromStorage() }); break;

    case ADD_ITEM: {
      const item = { ...payload, id: getUniqeId() };
      addItemToStorage(item);
      next({ type, payload: item });
      break;
    }

    case REMOVE_ITEM: {
      deleteItemFromStorage(payload);
      next(action);
      break;
    }

    case GET_USER: {
      const user = getUserFromStorage();
      next({ type, payload: user ? payload : null });
      break;
    }

    case LOGIN: {
      const { username, password, error } = user;
      const { username: givenName, password: givenPassword } = payload;
      if (username === givenName && password === givenPassword) {
        saveUserToStorage(payload);
        next({ type: LOGIN + DONE, payload });
      } else {
        next({ type: LOGIN + FAIL, payload: error });
      }
      break;
    }

    case LOGOUT: {
      removeUserFromStorage();
      next(action);
      break;
    }

    default: next(action);
  }
};
