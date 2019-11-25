import { Operator, mutate } from 'overmind';
import { response } from '../api/types';
import Graph from '../../structures/Graph';

export const createQuotesGraph: () => Operator<response> = () =>
  mutate(function createQuotesGraph({ state }, response: response) {
    state.quotes.graph = new Graph().init(response.assets || []);
  });
