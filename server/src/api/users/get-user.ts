import { User } from '../../models/user';

export default (user: User) => {
  return user.sendUser();
};
