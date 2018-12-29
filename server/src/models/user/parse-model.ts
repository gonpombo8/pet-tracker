import {
  DbUser,
  User,
} from './types';

export default (record: DbUser): User => ({
  ...record,
  _id: undefined,
  phone: record.phone || '',
  address: record.address || '',
});
