import { namespaced } from 'overmind/config';
import { IConfig } from 'overmind';

export const config = namespaced({});

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}
