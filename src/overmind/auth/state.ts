export enum logInState {
  logIn,
  logOut,
  inProgress
}

export type State = {
  logInState: logInState;
};

export const state: State = {
  logInState: logInState.logOut
};
