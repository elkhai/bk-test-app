import { Page } from './types';

type State = {
  currentPage: string;
  appIsReady: boolean;
};

export const state: State = {
  currentPage: Page.HOME,
  appIsReady: false
};
