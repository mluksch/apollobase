import { config } from '@config/index';
import { IUser, userCollection } from './user';
import { carCollection, ICar } from './car';
import { dbConnect } from '@utils/mongodb/dbConnect';
import once from 'lodash/once';

export type IModels = {
  Users: IUser;
  Cars: ICar;
};

export const connectDB = once(async () => {
  return dbConnect<IModels>({
    dbUri: config.DB_URI,
    dbName: config.DB_NAME,
    collectionInfos: {
      Users: userCollection,
      Cars: carCollection,
    },
  });
});
