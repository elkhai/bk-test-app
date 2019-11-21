import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { useRoutes, navigate } from 'hookrouter';
import { routes, routesNames } from './routes';

const RouterViews: React.FC = () => {
  const routeResult = useRoutes(routes);
  if (!routeResult) navigate(routesNames.home);
  return routeResult;
};

ReactDOM.render(<RouterViews />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
