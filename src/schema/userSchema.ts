import { gql } from 'apollo-server';
import { Resolvers } from '@generated/graphql';
import { ObjectId } from 'mongodb';
import { ISchemaElement } from '@utils/graphql/createSchema';
import { loginUser } from '../services/userService/loginUser';
import { logoutUser } from '@services/userService/logoutUser';
import { createUser } from '@services/userService/createUser';

const types = gql`
  type User {
    _id: ObjectID!
    email: String!
    firstName: String!
    lastName: String!
    car: Car
    createdAt: DateTime!
  }
`;

const queries = gql`
  extend type Query {
    userById(_id: ObjectID!): User
    user(email: String!): User
    userbyName(name: String!): User
  }
`;

const mutations = gql`
  extend type Mutation {
    loginUser(input: LoginInput!): User
    logoutUser(input: LogoutInput!): User
    createUser(input: CreateUserInput!): User
  }
`;

const inputs = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  input LogoutInput {
    email: String!
  }

  input CreateUserInput {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
  }
`;

export const typeDefs = gql`
  ${queries}
  ${inputs}
  ${mutations}
  ${types}
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
    userById: async (parent, args, context, info) => {
      return context.db.Users.findOne({ _id: new ObjectId(args._id) });
    },
    userbyName: async (parent, args, context, info) => {
      return null;
    },
  },
  Mutation: {
    loginUser: async (parent, args, context, info) => {
      const user = await loginUser(args.input);
      context.expressData.res.setHeader(
        'Authorization',
        user?.authorization?.token ?? null,
      );
      return user;
    },
    logoutUser: async (parent, args, context, info) => {
      const user = await logoutUser({
        email: args.input.email,
      });
      context.expressData.res.setHeader('Authorization', null);
      return user;
    },
    createUser: async (parent, args, context, info) => {
      const user = await createUser({
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        password: args.input.password,
        email: args.input.email,
      });
      context.expressData.res.setHeader(
        'Authorization',
        user.authorization.token,
      );
      return user;
    },
  },
};

export const userSchema: ISchemaElement<Resolvers> = {
  typeDefs,
  resolvers,
};
