import { Collection, MongoClient, Db } from 'mongodb';
import { config } from '@config/index';
import { IUser } from '@db/user';
import once from 'lodash/once';
import { ICat } from '@db/cat';

export type IDB = {
  Users: Collection<IUser>;
  Cats: Collection<ICat>;
  dbRef: Db;
};

export const connectDB = once(async (): Promise<IDB> => {
  const client = await MongoClient.connect(config.DB_URI, {
    keepAlive: true,
  });
  const dbRef = client.db('graphql-intro');
  await dbRef.collection('cats').createIndexes([
    {
      unique: true,
      key: {
        name: 1,
      },
    },
  ]);
  return {
    Users: dbRef.collection('users') as Collection<IUser>,
    Cats: dbRef.collection('cats') as Collection<ICat>,
    dbRef,
  };
});
