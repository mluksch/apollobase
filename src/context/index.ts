import { IModels } from '@models/index';
import { IGenericContext } from '@utils/graphql/createContextProducer';
import { IUser } from '@models/user';

export type IContextData = {
  user?: IUser | null;
};

export type IContext = IGenericContext<IModels, IContextData>;
