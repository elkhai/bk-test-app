export enum LogInResponseResult {
  OK = 'ok',
  ERROR = 'error'
}

export type LogInResponse = {
  result: LogInResponseResult;
  error?: string;
};

export enum request {
  login = 'login',
  quote = 'quote',
  history = 'history'
}
