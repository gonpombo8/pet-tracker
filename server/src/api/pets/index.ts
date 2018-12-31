import asyncApp, { Req } from '../../core/async-app';
import parser from '../../core/upload';
import load from '../load';
import can from '../can';
import createPet from './create-pet';
import getPets from './get-pets';
import getPet from './get-pet';
import getPetQrcode from './get-pet-qrcode';
import petFoundPosition from './pet-found-position';
import uploadAvatar from './upload-avatar';

const app = asyncApp();

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

app.get(
  '/:petId/:qrcode',
  'Returns pet and user fields for the specified pet&qrcode',
  load.pet.fromParams(),
  load.user.fromPet(),
  (req: Req) => getPetQrcode(req.user, req.pet, req.params.qrcode),
);

app.post(
  '/:petId/:qrcode/position',
  'Gets the position of the pet and sends a notification to the owner',
  load.pet.fromParams(),
  load.user.fromPet(),
  {
    'position?': {
      latitude: 'number',
      longitude: 'number',
    },
  },
  (req: Req) => petFoundPosition(
    req.user,
    req.pet,
    req.params.qrcode,
    req.body.position,
  ),
);

app.post(
  '/',
  'Creates a new pet for the user',
  {
    birthdate: 'number?',
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
  load.pet.fromParams(),
  can.view.pet(),
  // OMG a middleware.
  // We hate magic middlewares but let the parser do all this upload stuff
  // 🎸🦖
  parser.single('avatar'),
  // End of the magic 🙈
  // Oh yeah
  (req: Req) => uploadAvatar(
    req.pet,
    // Middlewares fault.
    (req as any).file,
  ),
);

export default app;
