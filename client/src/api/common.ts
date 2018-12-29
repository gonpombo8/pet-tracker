import qs from 'qs';

import { getEndpoints } from './config';
import { getSession } from './session-storage';

interface Query {
  [key: string]: string;
}

export const headers = {
  get: () => ({
    Accept: 'application/json',
  }),
  post: () => ({
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  }),
  getToken: (): {} | { Authorization: string } => {
    const token = getSession();

    return token && token.jwt ? { Authorization: `Bearer ${token.jwt}` } : {};
  },
};

const checkError = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};

const checkValidJWT = (response: Response) => {
  const token = getSession();

  if (response.headers.get('jwt-needs-refresh')
    && token
    && token.refresh
  ) {
    // tslint:disable-next-line:no-console
    console.log('Needs to refresh token');
  }
  return response;
};

const parseToJSON = (response: Response) => {
  const contentType = response.headers.get('content-type');

  if (!contentType || contentType.indexOf('application/json') >= 0) {
    return response.json().catch(() => ({}));
  }

  return response;
};

export const api = (url: string, args: RequestInit = {}) => {
  args.headers =  args.headers || {};

  return fetch(`${getEndpoints().api}${url}`, args)
    .then(checkError)
    .then(checkValidJWT)
    .then(parseToJSON);
};

const catchError = (url: string, method = 'GET') => (error: Error) => {
  // tslint:disable-next-line:no-console
  console.log(`${method} ${url} Failed with error: ${error}`);

  // TODO refresh token handler
  throw error;
};

export const authenticatedApi = (
  url: string,
  args: RequestInit = {},
) => {
  args.headers = {
    ...args.headers,
    ...headers.getToken(),
  };

  return api(url, args).catch(catchError(url, args.method));
};

export const get = <Response = any>
  (url: string, query?: Query): Promise<Response> => {
  const params = query ? `?${qs.stringify(query)}` : '';
  const uri = `${url}${params}`;

  return api(uri, { headers: headers.get() });
};

export const post = <Payload = any, Response = any>
  (url: string, payload: Payload): Promise<Response> =>
  api(
    url,
    {
      method: 'POST',
      headers: headers.post(),
      body: JSON.stringify(payload),
    },
  );

export const authenticatedGet = <Response = any>
  (url: string): Promise<Response> =>
    authenticatedApi(url, { headers: headers.get() });

export const authenticatedPost = <Payload = any, Response = any>
  (url: string, payload: Payload): Promise<Response> =>
    authenticatedApi(
      url,
      {
        method: 'POST',
        headers: headers.post(),
        body: JSON.stringify(payload),
      },
    );

export const authenticatedPut = <Payload = any, Response = any>
  (url: string, payload: Payload): Promise<Response> =>
    authenticatedApi(
      url,
      {
        method: 'PUT',
        headers: headers.post(),
        body: JSON.stringify(payload),
      },
    );

export const authenticatedPatch = <Payload = any, Response = any>
  (url: string, payload: Payload): Promise<Response> =>
    authenticatedApi(
      url,
      {
        method: 'PATCH',
        headers: headers.post(),
        body: JSON.stringify(payload),
      },
    );
