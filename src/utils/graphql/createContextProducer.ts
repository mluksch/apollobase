import { IDb } from '@utils/mongodb/dbConnect';
import { ContextFunction } from 'apollo-server-core/src/types';
import { Request, Response } from 'express';

export type IGenericContext<DB_MODELS, CTX_DATA = {}> = {
  db: IDb<DB_MODELS>;
  expressData: IExpressData;
  contextData?: CTX_DATA;
};

export type IExpressData = {
  req: Request;
  res: Response;
};

// createContextProducer:
// args = { db: await dbConnect({ ... }) }
export const createContextProducer = async <DB_MODELS, CTX_DATA = {}>(args: {
  db: IDb<DB_MODELS>;
  contextDataProducer?: (expressData: IExpressData) => Promise<CTX_DATA>;
}): Promise<
  ContextFunction<IExpressData, IGenericContext<DB_MODELS, CTX_DATA>>
> => {
  return async (expressData: IExpressData) => {
    const contextData: CTX_DATA = args.contextDataProducer
      ? await args.contextDataProducer(expressData)
      : undefined;
    return { db: args.db, contextData, expressData };
  };
};
