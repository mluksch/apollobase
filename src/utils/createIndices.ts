import { Collection, Db } from 'mongodb';
import { isPresent } from 'ts-is-present';
import { unwrapSettledPromises } from '@utils/unwrapSettledPromises';

export type ICollectionInfo<T = any> = {
  createIndex?: (db: Db) => Promise<string>;
  getCollection: (db: Db) => Collection<T>;
};

export const createIndices = async (
  db: Db,
  collectionInfos: ICollectionInfo[],
) => {
  return Promise.allSettled(
    collectionInfos
      .filter((info) => isPresent(info.createIndex))
      .map((info) => info.createIndex(db)),
  ).then(unwrapSettledPromises);
};
