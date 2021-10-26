import { gql } from 'apollo-server';
import { Resolvers } from '@generated/graphql';
import { ISchemaElement } from '@utils/graphql/createSchema';

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

export const carSchema: ISchemaElement<Resolvers> = {
  typeDefs,
  resolvers,
};
