import { badRequest } from 'async-app';

import { Pet } from '../../models/pet';

export default (pet: Pet, file: any) => {
  if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    throw badRequest('INVALID AVATAR');
  }

  return pet && file;
};
