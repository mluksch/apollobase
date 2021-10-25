import { gql } from 'apollo-server';
import { Resolvers } from '@generated/graphql';
import { ObjectId } from 'mongodb';

export const typeDefs = gql`
  type User {
    id: ID!
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
    id: async (parent, args, context, info) => {
      return parent?._id.toHexString() ?? null;
    },
    email: async (parent, args, context, info) => {
      return parent?.email ?? null;
    },
    lastName: async (parent, args, context, info) => {
      return parent?.lastName ?? null;
    },
    firstName: async (parent, args, context, info) => {
      return parent?.firstName ?? null;
    },
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
