import asyncApp, { Req } from '../../core/async-app';

import load from '../load';
import can from '../can';
import authenticate from './authenticate';
import getUser from './get-user';
import signup from './signup';
import updateUser from './update-user';

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
  '/',
  'Updates user',
  {
    address: 'string?',
    name: 'string?',
    phone: 'string?',
    surname: 'string?',
  },
  load.authenticated,
  load.user.fromClaims(),
  can.edit.user(),
  (req: Req) => updateUser(req.user, req.body),
);

export default app;
