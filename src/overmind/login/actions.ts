import { Action, Operator, pipe } from 'overmind';
import { fieldType } from './types';
import * as o from './operators';
import { responseResult } from '../api/types';
import { setLogInState } from '../auth/operators';
import { logInState } from '../auth/state';
import { openPage } from '../router/operators';
import { Page } from '../router/types';

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
      setLogInState(logInState.IN_PROGRESS),
      o.sendLogInRequest(),
      o.checkRequestStatus({
        [responseResult.OK]: pipe(
          setLogInState(logInState.LOG_IN),
          openPage(Page.HOME)
        ),
        [responseResult.ERROR]: o.showFormError()
      })
    ),
    false: o.showFieldErrors()
  })
);
