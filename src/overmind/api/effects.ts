import ky from 'ky';
import { request, response } from './types';

const requestUrl =
  process.env.NODE_ENV === 'production' ? '/api.php' : '/api.php';

export async function logIn(
  login: string,
  password: string
): Promise<response> {
  return ky
    .post(requestUrl, {
      json: { action: request.login, login, password }
    })
    .json();
}

export async function getQuotes(): Promise<response> {
  return ky.post(requestUrl, { json: { action: request.quote } }).json();
}

export async function getHistory(): Promise<response> {
  return ky.post(requestUrl, { json: { action: request.history } }).json();
}
