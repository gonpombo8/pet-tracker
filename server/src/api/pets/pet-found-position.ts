import { forbidden } from 'async-app';

import { Pet } from '../../models/pet';
import { User } from '../../models/user';
import petFoundTemplate from '../../email-templates/pet-founded';
import sendEmail from '../../helpers/send-email';

interface Position {
  latitude?: number;
  longitude?: number;
  error?: string;
}

export default async (
  user: User,
  pet: Pet,
  qrcode: string,
  position: Position,
) => {
  if (pet.qrcode !== qrcode) {
    throw forbidden('INVALID_QRCODE');
  }

  const coords = `${position.latitude},${position.longitude}`;
  const template = petFoundTemplate({
    coords,
    name: pet.name,
    type: pet.type,
  });
  const subject = `Someone scans ${pet.name} qrcode`;

  await sendEmail(user.email, subject, template);
};
