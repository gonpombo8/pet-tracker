import multer from 'multer';

import asyncApp, { Req } from '../../core/async-app';
import load from '../load';
import can from '../can';
import createPet from './create-pet';
import getPets from './get-pets';
import getPet from './get-pet';
import uploadAvatar from './upload-avatar';

const app = asyncApp();

const upload = multer({ dest: '/' });

app.get(
  '/',
  'Returns array of pets for the specified user',
  load.authenticated,
  load.user.fromClaims(),
  (req: Req) => getPets(req.user),
);

app.get(
  '/:petId',
  'Returns array of pets for the specified user',
  load.authenticated,
  load.pet.fromParams(),
  can.view.pet(),
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

app.put(
  '/:petId/upload-avatar',
  'Uploads petId avatar',
  {
    file: 'any',
  },
  load.authenticated,
  upload.single('avatar'),
  // load.pet.fromParams(),
  // can.view.pet(),
  (req: Req) => uploadAvatar(req.pet, (req as any).file),
);

export default app;
