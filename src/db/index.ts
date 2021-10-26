import { config } from '@config/index';
import { IUser, userCollection } from '@db/user';
import { carCollection, ICar } from '@db/car';
import { dbConnect } from '@utils/mongodb/dbConnect';

export const connectDB = async () => {
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
};
