import { ObjectId } from 'mongodb';
import { ICollectionInfo } from '@utils/mongodb/dbConnect';

const COLL_NAME = 'cars';

export type ICar = {
  _id: ObjectId;
  brand: string;
  description?: string;
};

export const carCollection: ICollectionInfo<ICar> = {
  createIndex: (db) => {
    return db.createIndex(COLL_NAME, [
      {
        brand: 1,
      },
    ]);
  },
  getCollection: (db) => db.collection<ICar>(COLL_NAME),
};
