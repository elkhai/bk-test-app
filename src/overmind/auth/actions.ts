import { Operator, pipe } from 'overmind';
import { setLogInState } from './operators';
import { logInState } from './state';
import * as lfo from '../login/operators';
import { sendLogInRequest, checkRequestStatus } from '../api/operators';
import { responseResult } from '../api/types';
import { openPage } from '../router/operators';
import { Page } from '../router/types';

export const logIn: Operator = pipe(
  lfo.clearErrors(),
  lfo.isFormValid({
    true: pipe(
      setLogInState(logInState.IN_PROGRESS),
      sendLogInRequest(),
      checkRequestStatus({
        [responseResult.OK]: pipe(
          setLogInState(logInState.LOG_IN),
          openPage(Page.HOME)
        ),
        [responseResult.ERROR]: lfo.showFormError()
      })
    ),
    false: lfo.showFieldErrors()
  })
);

export const logOut: Operator = pipe(
  setLogInState(logInState.LOG_OUT),
  openPage(Page.LOGIN)
);
