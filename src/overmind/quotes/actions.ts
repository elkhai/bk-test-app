import { Operator, pipe, noop, Action } from 'overmind';
import { responseResult } from '../api/types';
import { sendQuoteRequest, checkRequestStatus } from '../api/operators';
import { mapQuotes, writeQuotesList } from './operators';

export const load: Operator = pipe(
  sendQuoteRequest(),
  checkRequestStatus({
    [responseResult.OK]: pipe(mapQuotes(), writeQuotesList()),
    [responseResult.ERROR]: noop()
  })
);

export const manageFavs: Action<string> = ({ state, effects }, quote) => {
  const index = state.quotes.favs.indexOf(quote);
  if (index === -1) {
    state.quotes.favs.push(quote);
  } else {
    state.quotes.favs.splice(index, 1);
  }
};
