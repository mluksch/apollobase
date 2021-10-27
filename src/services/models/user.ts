import { ObjectId } from 'mongodb';
import { ICollectionInfo } from '@utils/mongodb/dbConnect';

const COLL_NAME = 'users';

export type IUser = {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  car?: ObjectId;
  createdAt: Date;
  authorization: {
    password: string;
    token?: string | null;
  };
};

export const userCollection: ICollectionInfo<IUser> = {
  createIndex: (db) => {
    return db.createIndex(COLL_NAME, [
      {
        email: 1,
      },
    ]);
  },
  getCollection: (db) => db.collection<IUser>(COLL_NAME),
};
