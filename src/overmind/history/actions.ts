import { Operator, pipe, noop, Action } from 'overmind';
import { sendHistoryRequest, checkRequestStatus } from '../api/operators';
import { responseResult } from '../api/types';
import * as o from './operators';

export const loadHistory: Operator = pipe(
  sendHistoryRequest(),
  checkRequestStatus({
    [responseResult.OK]: pipe(o.sortHistory(), o.chooseDeals(), o.saveDeals()),
    [responseResult.ERROR]: noop()
  })
);

export const changeInputValue: Action<number> = ({ state }, value) => {
  state.history.inputValue = value;
};

export const changePage: Action<number> = ({ state }, page) => {
  if (page < 0) {
    state.history.page = 0;
    state.history.inputValue = 1;
    return;
  }
  if (page > state.history.pages.length - 1) {
    state.history.page = state.history.pages.length - 1;
    state.history.inputValue = state.history.pages.length;
    return;
  }
  state.history.page = page;
  state.history.inputValue = page + 1;
};
