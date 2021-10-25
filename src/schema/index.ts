import { userSchema } from './userSchema';
import { carSchema } from './carSchema';
import { merge } from 'lodash';
import { typeDefs, resolvers } from 'graphql-scalars';
import { gql } from 'apollo-server';

export const rootSchema = {
  typeDefs: [
    gql`
      ${typeDefs.join('\n')}
    `,
    userSchema.typeDefs,
    carSchema.typeDefs,
  ],
  resolvers: merge(resolvers, userSchema.resolvers, carSchema.resolvers),
};
