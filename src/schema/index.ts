import { userSchema } from './userSchema';
import { carSchema } from './carSchema';
import { merge } from 'lodash';
import { typeDefs, resolvers } from 'graphql-scalars';
import { gql } from 'apollo-server';

const BASE_TYPE_DEFS = gql`
  type Query
  type Mutation
`;

const GRAPHQL_SCALARS_TYPE_DEFS = gql`
  ${typeDefs.join('\n')}
`;

export const rootSchema = {
  typeDefs: [
    BASE_TYPE_DEFS,
    GRAPHQL_SCALARS_TYPE_DEFS,
    userSchema.typeDefs,
    carSchema.typeDefs,
  ],
  resolvers: merge(resolvers, userSchema.resolvers, carSchema.resolvers),
};
