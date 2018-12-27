import asyncApp, { Req } from '../../core/async-app';
import load from '../load';
import createPet from './create-pet';
import getPets from './get-pets';
import getPet from './get-pet';

const app = asyncApp();

app.get(
  '/',
  'Returns array of pets for the specified user',
  load.authenticated,
  load.user.fromClaims(),
  (req: Req) => getPets(req.user),
);

app.get(
  '/:petid',
  'Returns array of pets for the specified user',
  load.authenticated,
  load.pet.fromParams(),
  (req: Req) => getPet(req.pet),
);

app.post(
  '/',
  'Creates a new pet for the user',
  {
    birthdate: 'number',
    name: 'string',
    type: '"dog"|"cat"',
  },
  load.authenticated,
  (req: Req) => createPet(req.claims.username, req.body),
  201,
);

export default app;
