import { forbidden } from 'async-app';

import { Pet } from '../../models/pet';
import { User } from '../../models/user';

export default (user: User, pet: Pet, qrcode: string) => {
  if (pet.qrcode !== qrcode) {
    throw forbidden('INVALID_QRCODE');
  }

  // TODO send email to the owner.
  return {
    user: {
      address: user.address,
      name: user.name,
      phone: user.phone,
      surname: user.surname,
    },
    pet: {
      avatar: pet.avatar,
      type: pet.type,
      name: pet.name,
    },
  };
};
