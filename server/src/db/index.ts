import config from 'dos-config';
import { memoize } from 'lodash';
import { MongoClient, MongoClientOptions } from 'mongodb';

import {
  Criteria,
  Changes,
  MongoCollection,
} from './types';

export * from './types';

const opts: MongoClientOptions = {
  useNewUrlParser: true,
  keepAlive: true,
};

export const getConnection: () => Promise<MongoClient> = memoize(
  () => new Promise<MongoClient>((resolve, reject) =>
    MongoClient.connect(config.mongo.url, opts, (err, client) => {
      if (err) return reject(err);
      resolve(client);
    }),
  ),
);

export const getDb = async () => (await getConnection()).db(config.mongo.db);

export const initDb = async () => {
  const db = await getDb();
  return db.admin().ping();
};

export const getCollection = async <T>(
  collectionName: string,
): Promise<MongoCollection<T>> => {
  const db = await getDb();

  return db.collection<T>(collectionName);
};

export const findOne = <T>(collectionName: string) =>
  async (criteria: Criteria<T>): Promise<T|null> => {
    const collection = await getCollection<T>(collectionName);
    return collection.findOne(criteria);
  };

export const find = <T>(collectionName: string) =>
  async (criteria: Criteria<T>): Promise<T[]> => {
    const collection = await getCollection<T>(collectionName);
    return collection.find(criteria).toArray();
  };

export const updateOne = <T>(collectionName: string) =>
  async (criteria: Criteria<T>, changes: Changes): Promise<void> => {
    const opts = { multi: true, upsert: true };
    const collection = await getCollection<T>(collectionName);

    await collection.updateOne(criteria, changes, opts);
  };

export const create = <T>(collectionName: string) =>
  async (model: Partial<T>): Promise<void> => {
    const collection = await getCollection<T>(collectionName);
    await collection.insertOne(model);
  };

export default getDb;
