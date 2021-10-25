import { userSchema } from './userSchema';
import { carSchema } from './carSchema';
import { merge } from 'lodash';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const schema = makeExecutableSchema({
  typeDefs: [userSchema.typeDefs, carSchema.typeDefs],
  resolvers: merge(userSchema.resolvers, carSchema.resolvers),
});
