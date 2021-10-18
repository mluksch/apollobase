import { connectDB, IDB } from '@db/index';
import { Request, Response } from 'express';

export type IContext = {
  db: IDB;
};

export const createContext = async (_input: {
  req: Request;
  res: Response;
}): Promise<IContext> => {
  const db = await connectDB();
  return {
    db,
  };
};
