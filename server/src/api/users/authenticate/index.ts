import { badRequest } from 'async-app';

import { findUser } from '../../../controllers/user';
import hash from '../../../helpers/hash';
import { createToken } from '../../../core/jwt/tokens';

interface Body {
  email: string;
  password: string;
}

export default async ({ email, password }: Body) => {
  const user = await findUser({ email });

  if (!user) {
    throw badRequest('USER_NOT_FOUND');
  }

  if (hash(password, user.username) !== user.password) {
    throw badRequest('INVALID_PASSWORD');
  }

  return { jwt: createToken({ username: user.username }) };
};
