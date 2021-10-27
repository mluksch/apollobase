import { config } from '@config/index';
import { IUser, userCollection } from './user';
import { carCollection, ICar } from './car';
import { createConnection } from '@utils/mongodb/createConnection';
import once from 'lodash/once';

export type IModels = {
  Users: IUser;
  Cars: ICar;
};

export const connectToDb = once(async () => {
  return createConnection<IModels>({
    dbUri: config.DB_URI,
    dbName: config.DB_NAME,
    collectionInfos: {
      Users: userCollection,
      Cars: carCollection,
    },
  });
});
