import { Action, Operator, pipe, noop } from 'overmind';
import { fieldType } from './types';
import * as o from './operators';
import { LogInResponseResult } from '../api/types';

export const setField: Action<{ fieldType: fieldType; value: string }> = (
  { state },
  payload
) => {
  state.loginForm[payload.fieldType].value = payload.value;
};

export const logIn: Operator = pipe(
  o.clearErrors(),
  o.isFormValid({
    true: pipe(
      o.sendLogInRequest(),
      o.checkRequestStatus({
        [LogInResponseResult.OK]: noop(),
        [LogInResponseResult.ERROR]: o.showFormError()
      })
    ),
    false: o.showFieldErrors()
  })
);
