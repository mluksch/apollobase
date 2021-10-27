import { config } from '@config/index';
import { IUser, userCollection } from '@db/user';
import { carCollection, ICar } from '@db/car';
import { dbConnect } from '@utils/mongodb/dbConnect';
import once from 'lodash/once';

export type IModels = {
  Users: IUser;
  Cars: ICar;
};

export const connectDB = once(async () => {
  return dbConnect<IModels>({
    dbUri: config.DB_URI,
    dbName: 'graphql-intro',
    collectionInfos: {
      Users: userCollection,
      Cars: carCollection,
    },
  });
});
