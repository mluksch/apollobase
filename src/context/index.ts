import { IModels } from '../services/models';
import { IGenericContext } from '@utils/graphql/createContextProducer';

export type IContext = IGenericContext<IModels>;
