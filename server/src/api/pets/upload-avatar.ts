import { Pet } from '../../models/pet';
import { updatePet } from '../../controllers/pet';

interface File {
  secure_url: string;
}

export default async ({ username }: Pet, file: File) => {
  const { secure_url: secureUrl } = file;

  await updatePet(
    { username },
    { $set: { avatar: secureUrl } },
  );

  return { avatar: secureUrl };
};
