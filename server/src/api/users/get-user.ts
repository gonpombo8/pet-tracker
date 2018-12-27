import { User } from '../../models/user';

export default async (user: User) => {
  return user.sendUser();
};
