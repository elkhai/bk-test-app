import React from 'react';
import styles from './App.module.css';
import { useOvermind } from '../overmind';
import { Page } from '../overmind/router/types';
import HomePage from './Home';
import LoginPage from './Login';

const routes = {
  [Page.HOME.toString()]: <HomePage />,
  [Page.LOGIN.toString()]: <LoginPage />
};

const App: React.FC = () => {
  const { state } = useOvermind();
  const Route = routes[state.router.currentPage];
  return (
    <div className={styles.app}>
      <p className={styles.header}>TEST SPA app</p>
      {Route}
    </div>
  );
};

export default App;
