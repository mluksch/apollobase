import { config } from '@config/index';
import { IUser, userCollection } from '@db/user';
import { carCollection, ICar } from '@db/car';
import { dbConnect } from '@utils/mongodb/dbConnect';
import once from 'lodash/once';

export const connectDB = once(async () => {
  return dbConnect<{
    Users: IUser;
    Cars: ICar;
  }>({
    dbUri: config.DB_URI,
    dbName: 'graphql-intro',
    collectionInfos: {
      Users: userCollection,
      Cars: carCollection,
    },
  });
});
