import { provides, unauthorized } from 'async-app';
import { Req } from '../../core/async-app';

const authenticated = (req: Req) => {
  if (!req.claims) {
    throw unauthorized('NEEDS_AUTH');
  }
};

export default provides(['claims'], authenticated);
