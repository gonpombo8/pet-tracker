import { badRequest } from 'async-app';

import { findUser, createUser } from '../../../controllers/user';
import { createToken } from '../../../core/jwt/tokens';
import generateUsername from '../../../helpers/generate-username';
import hash from '../../../helpers/hash';

interface Body {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export default async (body: Body) => {
  const user = await findUser({ email: body.email });

  if (user) {
    throw badRequest('USER_ALREADY_EXISTS');
  }

  const username = await generateUsername(body.email);
  const profile = {
    ...body,
    username,
    password: hash(body.password, username),
  };

  await createUser(profile);

  return { jwt: createToken({ username: profile.username }) };
};
