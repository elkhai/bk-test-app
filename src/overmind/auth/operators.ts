import { fork, Operator, action } from 'overmind';
import { logInState } from './state';
import { LogInResponse } from '../api/types';

export const forkUserIsLoggedIn: (paths: {
  [key: string]: Operator<void>;
}) => Operator<void> = paths =>
  fork(function forkUserIsLoggedIn({ state }) {
    return state.auth.logInState;
  }, paths);

export const setLogInState: (
  newLogInState: logInState
) => Operator<void | LogInResponse> = newLogInState =>
  action(async function setLogInState({ state, effects }) {
    state.auth.logInState = newLogInState;
    await effects.storage.saveToIdb(
      'logInState',
      Number(newLogInState).toString()
    );
  });
