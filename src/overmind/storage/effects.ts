import { Store, set, get } from 'idb-keyval';

const store = new Store('bk-app-db', 'bk-app');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveToIdb(key: string, value: any): Promise<void> {
  return set(key, value, store);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getFromIdb(key: string): Promise<any> {
  return get(key, store);
}
