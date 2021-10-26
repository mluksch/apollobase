import { connectDB } from '@db/index';
import { Request, Response } from 'express';
import { ContextFunction } from 'apollo-server-core/src/types';
import { IDb } from '@utils/mongodb/dbConnect';
import { IUser } from '@db/user';
import { ICar } from '@db/car';

export type IContext = {
  db: IDb<{
    Users: IUser;
    Cars: ICar;
  }>;
};

export const createContextFn = async (): Promise<
  ContextFunction<unknown, IContext>
> => {
  const db = await connectDB();
  return (_input: { req: Request; res: Response }) => {
    return { db };
  };
};
