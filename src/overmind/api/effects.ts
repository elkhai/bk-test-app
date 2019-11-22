import ky from 'ky';
import { LogInResponse, request } from './types';

export async function logIn(
  login: string,
  password: string
): Promise<LogInResponse> {
  return ky
    .post('/api.php', {
      json: {
        action: request.login,
        login,
        password
      }
    })
    .json();
}
