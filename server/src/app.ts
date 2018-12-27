import bodyparser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import config from 'dos-config';
import errorHandler from 'errorhandler';

import asyncApp, { Req } from './core/async-app';
import prodErrorHandler from './core/error/error-handler-middleware';
import jwt from './core/jwt';
import load from './api/load';
import usersApi from './api/users';
import petsApi from './api/pets';

const app = asyncApp();

app.use(cors({ origin: config.endpoints.webapp }));
app.use(bodyparser.json({ limit: '10mb' }));
app.use(compression());
app.use(jwt);

app.get(
  '/ping',
  (req: Req) => ({
    user: req.user,
    version: config.version,
  }),
);

app.get(
  '/ping-with-user',
  load.authenticated,
  (req: Req) => ({
    user: req.user,
    version: config.version,
  }),
);

app.use('/api/v0/users', usersApi);
app.use('/api/v0/pets', petsApi);

if (config.env === 'production') {
  app.use(prodErrorHandler);
} else {
  app.use(errorHandler());
}

export default app;
