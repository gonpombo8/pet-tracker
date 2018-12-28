import { create, Changes, Criteria, find, findOne, updateOne } from '../db';
import loadPet, { PetRecord, Pet } from '../models/pet';

const COLLECTION = 'pets';

export const findPet = async (criteria: Criteria<PetRecord>) => {
  const pet = await findOne<PetRecord>(COLLECTION)(criteria);
  return pet && loadPet(pet);
};

export const findPets = async (criteria: Criteria<PetRecord>) => {
  const pet = await find<PetRecord>(COLLECTION)(criteria);
  return pet.map(p => loadPet(p));
};

export const updatePet = async (
  criteria: Criteria<PetRecord>,
  changes: Changes<Partial<Pet>>,
) => {
  await updateOne<PetRecord>(COLLECTION)(criteria, changes);
};

export const insertPet = async (pet: Partial<Pet>) => {
  await create<PetRecord>(COLLECTION)(pet);
};

export const findPetById = (username: string) => findPet({ username });
