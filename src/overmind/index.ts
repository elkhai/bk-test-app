import { namespaced } from 'overmind/config';
import { IConfig } from 'overmind';
import { createHook } from 'overmind-react';
import * as router from './router';
import * as auth from './auth';
import * as loginForm from './login';
import * as api from './api';

export const config = namespaced({
  auth,
  router,
  loginForm,
  api
});

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>();
