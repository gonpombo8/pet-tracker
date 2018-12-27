import createApp, { Req as Request } from 'async-app';
import { Type as Schema } from 'mural-schema/types';

import { Entities } from './entities';
import compileSchemaFn from './schema';

export type Entities = Entities;

export type Req<T extends keyof Entities = keyof Entities>
  = Request<Entities, T> & { body: unknown };

export default () => createApp<Entities, Schema>({
  compileSchemaFn,
});
