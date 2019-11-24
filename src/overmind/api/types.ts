export type quote = {
  asset: string;
  startDate: Date;
  quote: string;
};

export type deal = {
  asset: string;
  startDate: Date;
  startQuote: string;
  finishDate: Date;
  finishQuote: string;
  profit: string;
};

export type requestOptions = {
  action: request;
  login?: string;
  password?: string;
};

export enum responseResult {
  OK = 'ok',
  ERROR = 'error'
}

export type response = {
  result: responseResult;
  error?: string;
  assets?: Array<quote>;
  deals?: Array<quote>;
};

export enum request {
  login = 'login',
  quote = 'quote',
  history = 'history'
}
