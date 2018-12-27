import { User } from './types';

export interface Methods {
  sendUser: () => User & { password: undefined };
}

export default (user: User): Methods => ({
  sendUser: sendUser(user),
});

const sendUser = (user: User) => () => ({
  ...user,
  password: undefined,
});
