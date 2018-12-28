import {
  api,
  authenticatedGet,
  authenticatedPost,
  headers,
} from './common';

export interface Pet {
  avatar?: string;
  birthdate?: number;
  name: string;
  userId: string;
  type: 'dog' | 'cat';
  qr: string;
  username: string;
}

export const getPets = (): Promise<Pet[]> =>
  authenticatedGet('/api/v0/pets');

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
