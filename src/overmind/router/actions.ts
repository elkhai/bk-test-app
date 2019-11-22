import { Operator, noop } from 'overmind';
import * as o from './operators';
import { forkUserIsLoggedIn } from '../auth/operators';
import { Page } from './types';
import { logInState } from '../auth/state';

export const showHomePage: Operator<void> = forkUserIsLoggedIn({
  [logInState.logIn]: o.setPage(Page.HOME),
  [logInState.logOut]: o.openPage(Page.LOGIN),
  [logInState.inProgress]: noop()
});

export const showLoginPage: Operator<void> = o.setPage(Page.LOGIN);
