import { Collection, MongoClient, Db } from 'mongodb';
import { config } from '@config/index';
import { IUser } from '@db/user';
import once from 'lodash/once';

export type IDB = {
  Users: Collection<IUser>;
  dbRef: Db;
};

export const connectDB = once(async (): Promise<IDB> => {
  const client = await MongoClient.connect(config.DB_URI, {
    keepAlive: true,
  });
  const dbRef = client.db('graphql-intro');
  return {
    Users: dbRef.collection('users') as Collection<IUser>,
    dbRef,
  };
});
