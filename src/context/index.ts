import { IModels } from '@db/index';
import { IGenericContext } from '@utils/graphql/createContextProducer';

export type IContext = IGenericContext<IModels>;
