import { authenticatedGet, authenticatedPost } from './common';
import { setSession } from './session-storage'

export interface User {
  email: string;
  name: string;
  surname: string;
  username: string;
}

interface Jwt {
  token: string;
  refresh: string;
}

export const getMe = (): Promise<User> =>
  authenticatedGet('/api/v0/users');

export const authenticate = (email: string, password: string): Promise<Jwt> =>
  authenticatedPost(
    '/api/v0/users/authenticate',
    { email, password },
  ).then((jwt: Jwt) => {
    setSession(jwt);
    return jwt;
  });

export const createUser = (user: {
  email: string;
  name: string;
  surname: string;
  password: string;
}): Promise<Jwt> => authenticatedPost(
    '/api/v0/users',
    user,
  ).then((jwt: Jwt) => {
    setSession(jwt);
    return jwt;
  });
