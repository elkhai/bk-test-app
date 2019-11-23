import ky from 'ky';
import {
  logInResponse,
  request,
  quoteResponse,
  historyResponse
} from './types';

const http = ky.create({ prefixUrl: '/api.php' });

export async function logIn(
  login: string,
  password: string
): Promise<logInResponse> {
  return http
    .post('/', {
      json: { action: request.login, login, password }
    })
    .json();
}

export async function getQuotes(): Promise<quoteResponse> {
  return http('/', { json: { action: request.quote } }).json();
}

export async function getHistory(): Promise<historyResponse> {
  return http('/', { json: { action: request.history } }).json();
}
