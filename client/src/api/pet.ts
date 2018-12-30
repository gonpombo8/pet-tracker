import {
  api,
  authenticatedGet,
  authenticatedPost,
  get,
  headers,
} from './common';
import { User } from './user';

export interface Pet {
  avatar?: string;
  birthdate?: number;
  name: string;
  userId: string;
  type: 'dog' | 'cat';
  qrcode: string;
  username: string;
}

export interface PetUserQrcode {
  user: Pick<User, 'name'|'surname'|'address'|'phone'>
  pet: Pick<Pet, 'avatar'|'name'|'type'>
}

export const getPets = (): Promise<Pet[]> =>
  authenticatedGet('/api/v0/pets');

export const getPetInfoViaQr = (
  petId: string,
  qrcode: string,
): Promise<PetUserQrcode> =>
  get(`/api/v0/pets/${petId}/${qrcode}`);

type PetPayload = Pick<Pet, 'name'|'type'|'birthdate'>
export const createPet = (pet: PetPayload): Promise<Pet> =>
  authenticatedPost(
    '/api/v0/pets',
    pet
  );

export const uploadAvatar = (
  petId: string,
  file: File,
): Promise<{ avatar: string }> => {
  const body = new FormData();
  body.append('avatar', file, file.name);

  return api(
    `/api/v0/pets/${petId}/upload-avatar`,
    {
      method: 'PUT',
      body,
      headers: headers.getToken(),
    }
  );
}
