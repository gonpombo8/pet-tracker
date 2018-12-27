import config from 'dos-config';
import crypto from 'crypto';

export default (password: string, salt: string): string =>
  crypto
    .createHmac('sha512', config.passwordSalt)
    .update(`${password}${salt}`)
    .digest('hex');
