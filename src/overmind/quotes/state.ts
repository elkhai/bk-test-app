import { Derive } from 'overmind';
import Graph from '../../structures/Graph';

type State = {
  favs: Array<string>;
  amount: number;
  firstDropdown: string;
  secondDropdown: string;
  graph: Graph;
  options: Derive<State, { firstDropdown: string[]; secondDropdown: string[] }>;
  result: string;
};

export const state: State = {
  favs: [],
  amount: 0,
  firstDropdown: 'EUR',
  secondDropdown: 'USD',
  graph: new Graph(),
  options: state => ({
    firstDropdown: state.graph
      .getNodes()
      .filter(asset => asset !== state.firstDropdown),
    secondDropdown: state.graph
      .getNodes()
      .filter(asset => asset !== state.secondDropdown)
  }),
  result: ''
};
