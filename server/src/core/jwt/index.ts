import expressJwt from 'express-jwt';
import config from 'dos-config';

import getToken from './get-token';

interface Username {
  username: string;
}

export type Claims = {
  [key: string]: string;
} & Username;

export default expressJwt({
  getToken,
  secret: config.jwt.secret,
  credentialsRequired: false,
  requestProperty: 'claims',
}).unless({
  path: [],
});
