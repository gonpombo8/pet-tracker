import { api, headers } from './common';

export const uploadAvatar = (petId: string, file: File) => {
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
