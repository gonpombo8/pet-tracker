import bodyparser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import config from 'dos-config';
import errorHandler from 'errorhandler';
import morgan from 'morgan';

import asyncApp, { Req } from './core/async-app';
import prodErrorHandler from './core/error/error-handler-middleware';
import jwt from './core/jwt';
import load from './api/load';
import usersApi from './api/users';
import petsApi from './api/pets';

const app = asyncApp();
// ORIGIN CORS MIDDLEWARE
app.use(cors({ origin: config.endpoints.webapp }));
// PARSE REQ.BODY
app.use(bodyparser.json({ limit: '10mb' }));
// COMPRESS REQUESTS
app.use(compression());
// INITIALIZE JWT
app.use(jwt);
// NO CACHE MIDDLEWARE
app.use((_, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});
// MORGAN LOGGER
morgan.token(
  'username',
  (req: any) => (req.claims ? `user: ${req.claims.username}` : 'visitor'),
);
morgan.token('body', req => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :username :body'),
);

// API V0 FTW 🎉
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
