import { Operator, pipe, noop, Action, mutate } from 'overmind';
import { responseResult } from '../api/types';
import { sendQuoteRequest, checkRequestStatus } from '../api/operators';
import * as o from './operators';
import { dropdown } from './types';

export const load: Operator = pipe(
  sendQuoteRequest(),
  checkRequestStatus({
    [responseResult.OK]: o.createQuotesGraph(),
    [responseResult.ERROR]: noop()
  })
);

export const manageFavs: Action<string> = ({ state }, quote) => {
  const index = state.quotes.favs.indexOf(quote);
  if (index === -1) {
    state.quotes.favs.push(quote);
  } else {
    state.quotes.favs.splice(index, 1);
  }
};

export const changeAmount: Action<number> = ({ state }, amount) => {
  state.quotes.amount = amount;
};

export const changeDropdown: Action<{
  value: string;
  dd: dropdown;
  otherDD: dropdown;
}> = ({ state }, { value, dd, otherDD }) => {
  state.quotes[dd] = value;
  state.quotes.result = '';
  if (state.quotes[dd] === state.quotes[otherDD])
    state.quotes[otherDD] = state.quotes.options[otherDD][0];
};

export const convertAssets: Operator = mutate(function convertAssets({
  state
}) {
  state.quotes.result = state.quotes.graph.calculate(
    state.quotes.amount,
    state.quotes.firstDropdown,
    state.quotes.secondDropdown
  );
});
