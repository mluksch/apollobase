import { gql } from 'apollo-server';
import { Resolvers } from '@generated/graphql';

export const typeDefs = gql`
  type Car {
    _id: ObjectID!
    brand: String!
    description: String
  }
`;

export const resolvers: Resolvers = {
  Car: {
    // use default resolver
  },
};

export const carSchema = {
  typeDefs,
  resolvers,
};
