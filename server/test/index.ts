/// <reference path="../src/defs.d.ts" />

import config from 'dos-config';
import { get, set } from 'lodash';
import httpSupertest from 'pickled-cucumber/http/supertest';
import pickledCucumber, { Options, SetupFn } from 'pickled-cucumber';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';

import app from '../src/app';
import hash from '../src/helpers/hash';
import { getConnection } from '../src/db';
import { createToken, Claims } from '../src/core/jwt/tokens';
import { DbUser } from '../src/models/user';
import entities from './entities';

const http = httpSupertest(
  request(app) as any,
  {
    applyCredentials: req => ({
      ...req,
      headers: {
        ...req.headers,
        Authorization: req.credentials
          && `Bearer ${createToken(req.credentials as Claims)}`,
      },
    }),
  },
);

const options: Options = {
  entities,
  http,
  usage: true,
  initialContext: () => ({ random: uuid() }),
};

const setup: SetupFn = ({
  AfterAll,
  Given,
  onTearDown,
  Then,
  getCtx,
  setCtx,
}) => {
  AfterAll(
    async () => (await getConnection()).close(),
  );
  Given(
    'a config key ([\\w.]+) =',
    (path, value) => {
      const current = get(config, path);
      const rollback = () => {
        set(config, path, current);
      };

      set(config, path, JSON.parse(value));
      onTearDown(rollback);
    },
    { inline: true },
  );

  Given(
    'a password {word} for user {variable}',
    async (word, userVar) => {
      const user = getCtx(userVar) as DbUser;
      const password = hash(word, user.username);
      const newUser = { ...user, password };
      await entities.user.update(user.username, { password });
      setCtx(userVar, newUser);
    },
  );

  Then(
    'the response token is a valid JWT',
    () => {
      const { text } = getCtx<{ text: string }>('$res');
      const { jwt: token } = JSON.parse(text);

      return jwt.verify(token, config.jwt.secret);
    },
  );
};

pickledCucumber(setup, options);
