import createPet from '../../models/pet/create';
import loadPet, { Pet } from '../../models/pet';
import { insertPet } from '../../controllers/pet';

interface Body {
  birthdate?: Pet['birthdate'];
  name: Pet['name'];
  type: Pet['type'];
}

export default async (userId: string, body: Body) => {
  const prePet = {
    ...body,
    userId,
  };

  const pet = await createPet(prePet);
  await insertPet(pet);

  return loadPet(pet);
};
