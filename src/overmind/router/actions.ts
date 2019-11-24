import { Operator, noop, pipe } from 'overmind';
import * as o from './operators';
import { forkUserIsLoggedIn } from '../auth/operators';
import { Page } from './types';
import { logInState } from '../auth/state';
import { load as loadQuotes } from '../quotes/actions';

export const showHomePage: Operator = pipe(
  forkUserIsLoggedIn({
    [logInState.LOG_IN]: pipe(loadQuotes, o.setPage(Page.HOME)),
    [logInState.LOG_OUT]: o.openPage(Page.LOGIN),
    [logInState.IN_PROGRESS]: noop()
  })
);

export const showLoginPage: Operator = o.setPage(Page.LOGIN);
