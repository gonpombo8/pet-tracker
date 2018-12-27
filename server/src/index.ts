import debug from 'debug';

import app from './app';
import { initDb } from './db';
import server from './server';

const log = debug('tracker');

const initServer = async () => {
  try {
    await server(app);
    await initDb();
  } catch (e) {
    log(e);
    process.exit(1);
  }
};

initServer();
