import { connectDB, IDB } from '@db/index';
import { Request, Response } from 'express';
import { ContextFunction } from 'apollo-server-core/src/types';

export type IContext = {
  db: IDB;
};

export const createContextFn = async (): Promise<
  ContextFunction<unknown, IContext>
> => {
  const db = await connectDB();
  return (_input: { req: Request; res: Response }) => {
    return { db };
  };
};
