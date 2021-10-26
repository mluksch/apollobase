import { config } from '@config/index';
import { IUser, userCollection } from '@db/user';
import { carCollection, ICar } from '@db/car';
import { dbConnect, IDb } from '@utils/mongodb/dbConnect';

export const connectDB = async (): Promise<
  IDb<{
    Users: IUser;
    Cars: ICar;
  }>
> => {
  return dbConnect({
    dbUri: config.DB_URI,
    dbName: 'graphql-intro',
    collectionInfos: {
      Users: userCollection,
      Cars: carCollection,
    },
  });
};
