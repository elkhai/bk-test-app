import { OnInitialize } from 'overmind';
import { Page } from './types';

const onInitialize: OnInitialize = async ({ state, actions, effects }) => {
  // restore state
  const logInState = await effects.storage.getFromIdb('logInState');
  if (logInState !== undefined) state.auth.logInState = Number(logInState);

  effects.router.initialize({
    [Page.HOME]: actions.router.showHomePage,
    [Page.LOGIN]: actions.router.showLoginPage
    // '/users/:id', actions.showUserModal
  });
};

export default onInitialize;
