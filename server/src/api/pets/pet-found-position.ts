import { forbidden } from 'async-app';

import { Pet } from '../../models/pet';
import { User } from '../../models/user';

interface Position {
  latitude?: number;
  longitud?: number;
  error?: string;
}

export default (user: User, pet: Pet, qrcode: string, position: Position) => {
  if (pet.qrcode !== qrcode) {
    throw forbidden('INVALID_QRCODE');
  }

  // TODO send email to the owner.
  return {
    position,
    name: user.name,
  };
};
