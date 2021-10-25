import { gql } from 'apollo-server';
import { Resolvers } from '@generated/graphql';
import { ObjectId } from 'mongodb';

export const typeDefs = gql`
  type User {
    _id: ObjectID!
    email: String!
    firstName: String!
    lastName: String!
    car: Car
    createdAt: DateTime!
  }

  type Query
  type Mutation

  extend type Query {
    user(email: String!): User
    userbyName(name: String!): User
  }

  extend type Mutation {
    loginUser(email: String!, password: String!): User
  }
`;

const resolvers: Resolvers = {
  User: {
    // use default resolver
    car: async (parent, args, context, info) => {
      return (
        parent.car && context.db.Cars.findOne({ _id: new ObjectId(parent.car) })
      );
    },
  },
  Query: {
    user: async (parent, { email }, context, info) => {
      return context.db.Users.findOne({ email });
    },
    userbyName: async (parent, args, context, info) => {
      return null;
    },
  },
  Mutation: {
    loginUser: (parent, args, context, info) => {
      return null;
    },
  },
};

export const userSchema = {
  typeDefs,
  resolvers,
};
