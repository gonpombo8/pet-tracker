import { User } from '../../models/user';
import { findPets } from '../../controllers/pet';

export default async (user: User) => {
  const pets = await findPets({ userId: user.username });

  return pets;
};
