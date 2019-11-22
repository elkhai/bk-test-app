import { OnInitialize } from 'overmind';
import { Page } from './types';

const onInitialize: OnInitialize = ({ actions, effects }) => {
  effects.router.initialize({
    [Page.HOME]: actions.router.showHomePage,
    [Page.LOGIN]: actions.router.showLoginPage
    // '/users/:id', actions.showUserModal
  });
};

export default onInitialize;
