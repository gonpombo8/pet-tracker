import config from 'dos-config';
import debug from 'debug';
import express from 'express';
import http from 'http';

const log = debug('tracker');

export default async (app: express.Application) =>
  new Promise((resolve, reject) => {
    http.createServer(app).listen(config.port, (err: Error) => {
      if (err) {
        return reject(err);
      }
      log(`Server running on port ${config.port}`);
      resolve(err);
    });
  });
