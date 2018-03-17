export function getItemsFromStorage() {
  return JSON.parse(localStorage.getItem('transactions'));
}

export function initStorage() {
  const items = getItemsFromStorage();
  if (!items) localStorage.setItem('transactions', JSON.stringify([]));
}

export function addItemToStorage(item) {
  const items = getItemsFromStorage();
  localStorage.setItem('transactions', JSON.stringify([...items, item]));
}

export function deleteItemFromStorage(id) {
  const items = getItemsFromStorage().filter(_item => _item.id !== id);
  localStorage.setItem('transactions', JSON.stringify([...items]));
}

export function getUniqeId() {
  const items = getItemsFromStorage();
  if (!items.length) return 0;
  const arrayOfIds = Array.from(Array(items.length).keys());
  const existIds = items.map(_item => _item.id);
  let id = null;
  for (let i = 0; i < arrayOfIds.length; i++) {
    const item = existIds.includes(arrayOfIds[i]);
    if (!item) {
      id = arrayOfIds[i]; break;
    }
  }
  return id !== null ? id : items.length;
}

export function getUserFromStorage() {
  return JSON.parse(localStorage.getItem('user'));
}

export function saveUserToStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserFromStorage() {
  localStorage.removeItem('user');
}
