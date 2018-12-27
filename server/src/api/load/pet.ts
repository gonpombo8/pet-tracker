import { loadWith } from 'async-app';

import { Entities } from '../../core/async-app';
import { findPetById } from '../../controllers/pet';

const loadUser = loadWith<Entities, 'pet', 'username'>(
  findPetById,
  user => user.username,
);

export default {
  fromParams: () => loadUser(
    req => req.params.petId,
    'pet',
  ),
};
