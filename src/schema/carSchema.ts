import { gql } from 'apollo-server';
import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  UserResolvers,
} from '@generated/graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const typeDefs = gql`
  type Car {
    id: ID!
    brand: String!
    description: String
  }
`;

export const resolvers: Resolvers = {
  Car: {
    id: async (parent: any, args: any, context: any, info: any) => {
      return parent?._id.toHexString() ?? null;
    },
  },
};

export const carSchema = {
  typeDefs,
  resolvers,
};
