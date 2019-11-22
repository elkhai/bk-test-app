import { mutate, Operator, run } from 'overmind';
import { Page } from './types';

export const setPage: <T>(page: Page) => Operator<T> = page =>
  mutate(function setPage({ state }) {
    state.router.currentPage = page;
  });

export const openPage: <T>(page: Page) => Operator<T> = page =>
  run(function doSomething({ effects }) {
    effects.router.open(page);
  })
