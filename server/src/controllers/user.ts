import { create, Changes, Criteria, find, findOne, update } from '../db';
import parseUser, { DbUser, User } from '../models/user';

const COLLECTION = 'users';

export const findUsers = async (criteria: Criteria<DbUser>) => {
  const users = await find<DbUser>(COLLECTION)(criteria);
  return users.map(parseUser);
};

export const findUser = async (criteria: Criteria<DbUser>) => {
  const user = await findOne<DbUser>(COLLECTION)(criteria);
  return user && parseUser(user);
};

export const updateUser = async (
  criteria: Criteria<DbUser>,
  changes: Changes<Partial<User>>,
) => {
  await update<DbUser>(COLLECTION)(criteria, changes);
};

export const createUser = async (user: Partial<User>) => {
  await create<DbUser>(COLLECTION)(user);
};

export const findUserById = async (username: string) => findUser({ username });
