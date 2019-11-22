import { Action } from 'overmind';
import { fieldType } from './types';

export const setField: Action<{ fieldType: fieldType; value: string }> = (
  { state },
  payload
) => {
  state.loginForm[payload.fieldType].value = payload.value;
};
