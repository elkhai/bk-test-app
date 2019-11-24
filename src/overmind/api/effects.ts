import ky from 'ky';
import { request, response } from './types';

export async function logIn(
  login: string,
  password: string
): Promise<response> {
  return ky
    .post('/api.php', {
      json: { action: request.login, login, password }
    })
    .json();
}

export async function getQuotes(): Promise<response> {
  return ky.post('/api.php', { json: { action: request.quote } }).json();
}

export async function getHistory(): Promise<response> {
  return ky.post('/api.php', { json: { action: request.history } }).json();
}
