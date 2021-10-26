import { userSchema } from './userSchema';
import { carSchema } from './carSchema';
import { generateSchema } from '@utils/graphql/createSchema';
import { Resolvers } from '@generated/graphql';

export const rootSchema = generateSchema<Resolvers>([userSchema, carSchema]);
