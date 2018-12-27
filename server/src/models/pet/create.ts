import uuid from 'uuid';

import { Record, Model } from './types';
import { generateUsername } from '../../helpers/generate-username';

type PrePet = Pick<
  Model,
  | 'birthdate'
  | 'userId'
  | 'name'
  | 'type'
>;

export default async (pre: PrePet): Promise<Record> => {
  const qr = uuid();
  const username = await generateUsername(pre.name);

  return {
    ...pre,
    qr,
    username,
  };
};
