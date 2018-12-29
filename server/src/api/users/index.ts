import asyncApp, { Req } from '../../core/async-app';

import load from '../load';
import can from '../can';
import authenticate from './authenticate';
import getUser from './get-user';
import signup from './signup';

const app = asyncApp();

app.get(
  '/',
  'Returnts the user specified via jwt session',
  load.authenticated,
  load.user.fromClaims(),
  (req: Req) => getUser(req.user),
);

app.post(
  '/',
  'Creates a new user and returns jwt',
  {
    email: 'email',
    name: 'string',
    surname: 'string',
    password: 'string',
  },
  (req: Req) => signup(req.body),
  201,
);

app.post(
  '/authenticate',
  'Authenticates a user by email and password',
  { email: 'email', password: 'string' },
  (req: Req) => authenticate(req.body),
);


app.patch(
  '/:userId',
  'Updates user',
  {

  },
  load.authenticated,
  load.user.fromClaimsO(),
  can.edit.user(),
);

export default app;
