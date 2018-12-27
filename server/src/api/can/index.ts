import { createPermissions } from 'async-app';

import { Entities } from '../../core/async-app/entities';
import entities from './entities';

export default createPermissions<Entities>(entities);
