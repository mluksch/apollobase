import { Collection, MongoClient, Db } from 'mongodb';
import { config } from '@config/index';
import { IUser, userCollection } from '@db/user';
import { carCollection, ICar } from '@db/car';
import { createIndices } from '@utils/createIndices';

export type IDB = {
  Users: Collection<IUser>;
  Cars: Collection<ICar>;
  dbRef: Db;
};

export const connectDB = async (): Promise<IDB> => {
  const client = await MongoClient.connect(config.DB_URI, {
    keepAlive: true,
    socketTimeoutMS: 2000,
    connectTimeoutMS: 2000,
  });
  const dbRef = client.db('graphql-intro');
  await createIndices(dbRef, [carCollection, userCollection]);
  return {
    Users: userCollection.getCollection(dbRef),
    Cars: carCollection.getCollection(dbRef),
    dbRef,
  };
};
