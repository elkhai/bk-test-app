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

export const mapUniqueQuotes: () => Operator<response, string[]> = () =>
  map(function mapUniqueQuotes(_, response: response) {
    const reducer: Array<string> = [];
    if (!response.assets) return [];
    return response.assets.reduce((reducer, asset) => {
      const assets = asset.asset.split('/');
      for (const asset of assets) {
        if (reducer.indexOf(asset) === -1) reducer.push(asset);
      }
      return reducer;
    }, reducer);
  });

export const writeUniqueList: () => Operator<Array<string>> = () =>
  mutate(function writeUniqueList({ state }, quotes: Array<string>) {
    state.quotes.uniqueAssets = quotes;
  });

export const writeQuotesList: () => Operator<mappedQuotes> = () =>
  mutate(function writeQuotesList({ state }, quotes: mappedQuotes) {
    state.quotes.mappedList = quotes;
  });
