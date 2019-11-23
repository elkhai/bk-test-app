import { Store, set, get } from 'idb-keyval';

const store = new Store('bk-app-db', 'bk-app');

export async function saveToIdb(key: string, value: string): Promise<void> {
  return set(key, value, store);
}

export async function getFromIdb(key: string): Promise<string> {
  return get(key, store);
}
