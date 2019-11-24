import { mappedQuotes } from './types';

type State = {
  favs: Array<string>;
  mappedList: mappedQuotes;
};

export const state: State = {
  favs: [],
  mappedList: {}
};
