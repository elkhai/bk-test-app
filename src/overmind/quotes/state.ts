import { mappedQuotes } from './types';

type State = {
  favs: Array<string>;
  mappedList: mappedQuotes;
  uniqueAssets: Array<string>;
  amount: number;
  firstDropdownValue: string;
  secondDropdownValue: string;
  secondDropdownOptions: Array<string>;
  result: string;
};

export const state: State = {
  favs: [],
  mappedList: {},
  uniqueAssets: [],
  amount: 0,
  firstDropdownValue: 'EUR',
  secondDropdownValue: 'USD',
  secondDropdownOptions: [],
  result: ''
};
