import { Collection, Db, MongoClient } from 'mongodb';
import { isPresent } from 'ts-is-present';
import { unwrapSettledPromises } from '@utils/promise/unwrapSettledPromises';
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';

export type ICollectionInfo<T = any> = {
  createIndex?: (db: Db) => Promise<string>;
  getCollection: (db: Db) => Collection<T>;
};

export type IDb<DB_MODEL> = {
  [key in keyof DB_MODEL]: Collection<DB_MODEL[key]>;
};

const createIndices = async (db: Db, collectionInfos: ICollectionInfo[]) => {
  return Promise.allSettled(
    collectionInfos
      .filter((info) => isPresent(info.createIndex))
      .map((info) => info.createIndex(db)),
  ).then(unwrapSettledPromises);
};

const getDb = <DB_MODEL>(
  db: Db,
  collectionInfos: {
    [collectionName: string]: ICollectionInfo;
  },
): IDb<DB_MODEL> => {
  return mapValues(collectionInfos, (info) => {
    return info.getCollection(db);
  }) as IDb<DB_MODEL>;
};

// MODEL: { <CollectionName>: <Collection-Type> } i.e: { Users: IUser, Cars: ICar }
export const dbConnect = async <DB_MODEL>(args: {
  dbUri: string;
  dbName: string;
  collectionInfos: {
    [collectionName: string]: ICollectionInfo;
  };
}): Promise<IDb<DB_MODEL>> => {
  const client = await MongoClient.connect(args.dbUri, {
    keepAlive: true,
    socketTimeoutMS: 2000,
    connectTimeoutMS: 2000,
  });
  const dbRef = client.db(args.dbName);
  await createIndices(dbRef, values(args.collectionInfos));
  return getDb(dbRef, args.collectionInfos);
};
