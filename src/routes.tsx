import React from 'react';
import App from './pages/App/App';

export enum routesNames {
  home = '/'
}

export const routes = {
  [routesNames.home]: () => <App />
};
