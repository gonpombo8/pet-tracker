import { deburr } from 'lodash';
import { findUser } from '../controllers/user';

const MAX_USERNAME_LENGTH = 10;

export const parseString = (val: string) =>
  deburr(val).toLowerCase().replace(/[^a-z0-9]/g, '');

export const generateUsername = (value: string) => {
  const name = parseString(value).substring(0, MAX_USERNAME_LENGTH);
  const code = Date.now().toString().slice(-4);

  return `${name}${code}`;
};

export const availableUsername = async (email: string): Promise<string> => {
  const username = generateUsername(email);

  if (!await findUser({ username })) {
    return username;
  }

  return availableUsername(email);
};

export default availableUsername;
