import { Operator, map, mutate } from 'overmind';
import { response } from '../api/types';
import { mappedQuotes } from './types';

export const mapQuotes: () => Operator<response, mappedQuotes> = () =>
  map(function mapQuotes(_, response: response) {
    const reducer: mappedQuotes = {};
    if (!response.assets) return {};
    return response.assets.reduce((reducer, asset) => {
      const name = asset.asset;
      reducer[name] = asset;
      return reducer;
    }, reducer);
  });

export const writeQuotesList: () => Operator<mappedQuotes> = () =>
  mutate(function writeQuotesList({ state }, quotes: mappedQuotes) {
    state.quotes.mappedList = quotes;
  });
