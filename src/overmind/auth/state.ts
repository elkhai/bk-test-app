export enum logInState {
  LOG_IN,
  LOG_OUT,
  IN_PROGRESS
}

export type State = {
  logInState: logInState;
};

export const state: State = {
  logInState: logInState.LOG_OUT
};
