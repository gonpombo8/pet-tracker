import mongodb from 'pickled-cucumber/entities/mongodb';
import faker from 'faker/locale/en';

import { generateUsername } from '../src/helpers/generate-username';
import { getDb } from '../src/db';
import { DbUser } from '../src/models/user';
import { PetRecord } from '../src/models/pet';

const db = () => getDb() as any;

const user = mongodb<DbUser, 'username'>(
  db,
  'users',
  'username',
  {
    onCreate: (attrs = {}) => ({
      _id: faker.random.uuid(),
      username: generateUsername(faker.internet.userName()),
      name: 'Leandro Atilio',
      surname: 'Romagnoli',
      email: faker.internet.email(),
      type: 'member',
      ...attrs,
    }),
  },
);

const pet = mongodb<PetRecord, 'username'>(
  db,
  'pets',
  'username',
  {
    onCreate: (attrs = {}) => ({
      _id: faker.random.uuid(),
      birthdate: faker.random.number(),
      userId: '',
      qr: `${faker.random.number()}`,
      username: generateUsername(faker.internet.userName()),
      name: faker.internet.userName(),
      type: 'dog',
      ...attrs,
    }),
  },
);

export default {
  pet,
  user,
};
