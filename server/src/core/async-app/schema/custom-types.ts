import { TypeMap } from 'mural-schema/types';
import isEmail from '../../../helpers/is-email';

const types: TypeMap = {
  email: v => isEmail(v) && v.length < 256,
};

export default types;
