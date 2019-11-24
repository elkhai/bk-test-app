import { Operator, pipe, noop, Action, parallel, mutate } from 'overmind';
import { responseResult } from '../api/types';
import { sendQuoteRequest, checkRequestStatus } from '../api/operators';
import {
  mapQuotes,
  writeQuotesList,
  mapUniqueQuotes,
  writeUniqueList
} from './operators';

export const load: Operator = pipe(
  sendQuoteRequest(),
  checkRequestStatus({
    [responseResult.OK]: parallel(
      pipe(mapQuotes(), writeQuotesList()),
      pipe(
        mapUniqueQuotes(),
        writeUniqueList(),
        mutate(function({ actions }) {
          actions.quotes.calculateSecondDropdownOptions();
        })
      )
    ),
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

export const calculateSecondDropdownOptions: Action = ({ state, actions }) => {
  const secondDropdownOptions = [];
  for (const pair in state.quotes.mappedList) {
    const index = pair.indexOf(state.quotes.firstDropdownValue);
    if (index !== -1) {
      if (index === 0) secondDropdownOptions.push(pair.substr(4));
      if (index === 4) secondDropdownOptions.push(pair.substr(0, 3));
    }
  }
  state.quotes.secondDropdownOptions = secondDropdownOptions;
  actions.quotes.changeSecondDropdown(state.quotes.secondDropdownOptions[0]);
};

export const changeFirstDropdown: Action<string> = (
  { state, actions },
  value
) => {
  state.quotes.firstDropdownValue = value;
  state.quotes.result = '';
  actions.quotes.calculateSecondDropdownOptions();
};

export const changeSecondDropdown: Action<string> = ({ state }, value) => {
  state.quotes.secondDropdownValue = value;
  state.quotes.result = '';
};

export const convert: Action = ({ state }) => {
  const {
    firstDropdownValue: first,
    secondDropdownValue: second,
    mappedList: list
  } = state.quotes;
  let positive: boolean;
  if (list[`${first}/${second}`]) {
    positive = true;
  } else {
    positive = false;
  }
  const result = positive
    ? state.quotes.amount * Number(list[`${first}/${second}`].quote)
    : state.quotes.amount / Number(list[`${second}/${first}`].quote);
  state.quotes.result = String(Math.round(result * 100) / 100);
};
