import { DbUser, User as U } from './types';

import parseModel from './parse-model';
import methods, { Methods } from './methods';

export interface User extends U, Methods {}
export type DbUser = DbUser;

export default (record: DbUser): User => {
  const props = parseModel(record);

  return {
    ...props,
    ...methods(props),
  };
};
