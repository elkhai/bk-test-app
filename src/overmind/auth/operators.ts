import { fork, Operator, mutate } from 'overmind';
import { logInState } from './state';
import { response } from '../api/types';

export const forkUserIsLoggedIn: (paths: {
  [key: string]: Operator<void>;
}) => Operator<void> = paths =>
  fork(function forkUserIsLoggedIn({ state }) {
    return state.auth.logInState;
  }, paths);

export const setLogInState: (
  newLogInState: logInState
) => Operator<void | response> = newLogInState =>
  mutate(async function setLogInState({ state, effects }) {
    state.auth.logInState = newLogInState;
    await effects.storage.saveToIdb(
      'logInState',
      Number(newLogInState).toString()
    );
  });
