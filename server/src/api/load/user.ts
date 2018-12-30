import { loadWith } from 'async-app';

import { Entities } from '../../core/async-app';
import { findUserById } from '../../controllers/user';

const loadUser = loadWith<Entities, 'user', 'username'>(
  findUserById,
  user => user.username,
);

export default {
  fromClaims: () => loadUser(
    req => req.claims.username,
    'user',
  ),
  fromPet: () => loadUser(
    req => req.pet.userId,
    'user',
  ),
};
