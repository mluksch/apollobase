import { IModels } from '../services/models';
import { IGenericContext } from '@utils/graphql/createContextProducer';
import { IUser } from '../services/models/user';

export type IContextData = {
  user?: IUser | null;
};

export type IContext = IGenericContext<IModels, IContextData>;
