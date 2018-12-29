import { User } from '../../models/user';
import { updateUser } from '../../controllers/user';

interface Changes {
  address?: string;
  name?: string;
  phone?: string;
  surname?: string;
}
export default async (user: User, changes: Changes) =>
  updateUser(
    { username: user.username },
    { $set: changes },
  );
