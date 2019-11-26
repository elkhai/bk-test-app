import { Page } from './types';

type State = {
  currentPage: Page;
  appIsReady: boolean;
};

export const state: State = {
  currentPage: Page.HOME,
  appIsReady: false
};
