type asset = {
  asset: string;
  date: Date;
  quote: string;
};

type deal = {
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

export type logInResponse = {
  result: responseResult;
  error?: string;
};

export type quoteResponse = {
  result: responseResult;
  assets: Array<asset>;
  error?: string;
};

export type historyResponse = {
  result: responseResult;
  deals: Array<deal>;
  error?: string;
}

export enum request {
  login = 'login',
  quote = 'quote',
  history = 'history'
}
