import { gql } from 'apollo-server';
import { Resolvers } from '@generated/graphql';

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
