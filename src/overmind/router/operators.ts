import { mutate, Operator, run } from 'overmind';

export const setPage: <T>(page: string) => Operator<T> = page =>
  mutate(function setPage({ state }) {
    state.router.currentPage = page;
    if (!state.router.appIsReady) state.router.appIsReady = true;
  });

export const openPage: <T>(page: string) => Operator<T> = page =>
  run(function openPage({ effects }) {
    effects.router.open(page);
  });
