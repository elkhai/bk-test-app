import { Operator, when, mutate, fork, map } from 'overmind';
import { emailErrorMessage, passwordErrorMessage } from './errors';
import { logInResponse } from '../api/types';

export const isFormValid: (paths: {
  true: Operator;
  false: Operator;
}) => Operator = paths =>
  when(function isFormValid({ state }) {
    return state.loginForm.isEmailValid && state.loginForm.isPasswordValid;
  }, paths);

export const sendLogInRequest: () => Operator<void, logInResponse> = () =>
  map(async function sendLogInRequest({ state, effects }) {
    const { email, password } = state.loginForm;
    const response: logInResponse = await effects.api.logIn(
      email.value,
      password.value
    );
    return response;
  });

export const checkRequestStatus: (paths: {
  [key: string]: Operator<logInResponse>;
}) => Operator<logInResponse> = paths =>
  fork(function checkRequestStatus(_, response) {
    return response.result;
  }, paths);

export const showFieldErrors: () => Operator = () =>
  mutate(function showFieldErrors({ state }) {
    if (!state.loginForm.isEmailValid)
      state.loginForm.email.error = emailErrorMessage;
    if (!state.loginForm.isPasswordValid)
      state.loginForm.password.error = passwordErrorMessage;
  });

export const showFormError: () => Operator<logInResponse> = () =>
  mutate(function showFormError({ state }, response: logInResponse) {
    state.loginForm.formError = response.error;
  });

export const clearErrors: () => Operator = () =>
  mutate(function clearErrors({ state }) {
    state.loginForm.email.error = null;
    state.loginForm.password.error = null;
    state.loginForm.formError = null;
  });
