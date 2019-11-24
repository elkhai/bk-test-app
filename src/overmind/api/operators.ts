import { Operator, fork, map } from 'overmind';
import { response } from './types';

export const sendLogInRequest: () => Operator<void, response> = () =>
  map(async function sendLogInRequest({ state, effects }) {
    const { email, password } = state.loginForm;
    const response: response = await effects.api.logIn(
      email.value,
      password.value
    );
    return response;
  });

export const sendQuoteRequest: () => Operator<void, response> = () =>
  map(async function sendQuoteRequest({ effects }) {
    const response: response = await effects.api.getQuotes();
    return response;
  });

export const sendHistoryRequest: () => Operator<void, response> = () =>
  map(async function sendHistoryRequest({ effects }) {
    const response: response = await effects.api.getHistory();
    return response;
  });

export const checkRequestStatus: (paths: {
  [key: string]: Operator<response>;
}) => Operator<response> = paths =>
  fork(function checkRequestStatus(_, response: response) {
    return response.result;
  }, paths);
