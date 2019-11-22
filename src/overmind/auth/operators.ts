import { fork, Operator } from 'overmind';

export const forkUserIsLoggedIn: (paths: {
  [key: string]: Operator<void>;
}) => Operator<void> = paths =>
  fork(function forkUserIsLoggedIn(cfg) {
    return cfg.state.auth.logInState;
  }, paths);
