import React from 'react';
import styles from './App.module.css';
import { useOvermind } from '../overmind';
import { Page } from '../overmind/router/types';
import HomePage from './Home';
import LoginPage from './Login';
import Button, { types } from '../components/Button';
import { logInState } from '../overmind/auth/state';

const routes = {
  [Page.HOME.toString()]: <HomePage />,
  [Page.LOGIN.toString()]: <LoginPage />
};

const App: React.FC = () => {
  const { state, actions } = useOvermind();
  const Route = routes[state.router.currentPage];
  return (
    <div className={styles.app}>
      <h1 className={styles.header}>TEST SPA app</h1>
      <div className={styles.button}>
        {state.auth.logInState === logInState.LOG_IN && (
          <Button
            componentType={types.TRANSPARENT}
            onClick={() => actions.auth.logOut()}>
            Выход
          </Button>
        )}
      </div>
    {state.router.appIsReady && Route}
    </div>
  );
};

export default App;
