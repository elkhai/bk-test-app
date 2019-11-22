import { namespaced } from 'overmind/config';
import { IConfig } from 'overmind';
import * as router from './router';
import * as auth from './auth';
import * as loginForm from './login';
import { createHook } from 'overmind-react';

export const config = namespaced({
  auth,
  router,
  loginForm
});

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>();
