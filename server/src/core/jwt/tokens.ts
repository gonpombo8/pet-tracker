import config from 'dos-config';
import jwt from 'jsonwebtoken';
import { internalServerError } from 'async-app';

import { findUser } from '../../controllers/user';
import { Claims } from '.';

export type Claims = Claims;

export const createToken = (claims: Claims) => {
  const opts = { expiresIn: config.jwt.expiration };

  return jwt.sign(claims, config.jwt.secret, opts);
};

export const createUserToken = async (claims: Claims) => {
  const { username } = claims;

  const user = await findUser({ username });

  if (!user) throw internalServerError('USER_NOT_FOUND');

  const token = createToken(claims);

  return { jwt: token };
};
