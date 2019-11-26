import { deal } from '../api/types';

type State = {
  inputValue: number;
  page: number;
  deals: Array<deal>;
  pages: Array<deal[]>;
};

export const state: State = {
  page: 0,
  inputValue: 1,
  deals: [],
  pages: [[]]
};
