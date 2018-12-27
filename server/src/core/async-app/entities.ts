import { Entities as BaseEntities } from 'async-app';

import { User } from '../../models/user';
import { Pet } from '../../models/pet';
import { Claims } from '../../core/jwt';

export interface Entities extends BaseEntities {
  claims: Claims;
  user: User;
  pet: Pet;
}
