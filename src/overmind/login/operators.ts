import { Operator, when, mutate } from 'overmind';
import { emailErrorMessage, passwordErrorMessage } from './errors';
import { response } from '../api/types';

export const isFormValid: (paths: {
  true: Operator;
  false: Operator;
}) => Operator = paths =>
  when(function isFormValid({ state }) {
    return state.loginForm.isEmailValid && state.loginForm.isPasswordValid;
  }, paths);

export const showFieldErrors: () => Operator = () =>
  mutate(function showFieldErrors({ state }) {
    if (!state.loginForm.isEmailValid)
      state.loginForm.email.error = emailErrorMessage;
    if (!state.loginForm.isPasswordValid)
      state.loginForm.password.error = passwordErrorMessage;
  });

export const showFormError: () => Operator<response> = () =>
  mutate(function showFormError({ state }, response: response) {
    state.loginForm.formError = response.error;
  });

export const clearErrors: () => Operator = () =>
  mutate(function clearErrors({ state }) {
    state.loginForm.email.error = null;
    state.loginForm.password.error = null;
    state.loginForm.formError = null;
  });
