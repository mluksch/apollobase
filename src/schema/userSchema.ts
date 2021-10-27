import { gql } from 'apollo-server';
import { Resolvers } from '@generated/graphql';
import { ObjectId } from 'mongodb';
import { ISchemaElement } from '@utils/graphql/createSchema';
import { loginUser } from '../services/userService/loginUser';
import { logoutUser } from '@services/userService/logoutUser';
import { createUser } from '@services/userService/createUser';
import jwt from 'jsonwebtoken';
import { config } from '@config/index';

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
    signupUser(input: SignupUserInput!): Boolean
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
    jwt: String!
    firstName: String!
    lastName: String!
    password: String!
  }

  input SignupUserInput {
    email: String!
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
      const token = user?.authorization?.token;
      if (token) {
        context.expressData.res.setHeader('Authorization', token);
        context.expressData.res.cookie('Authorization', token);
      }
      return user;
    },
    logoutUser: async (parent, args, context, info) => {
      const user = await logoutUser({
        email: args.input.email,
      });
      if (user) {
        context.expressData.res.clearCookie('Authorization');
      }
      return user;
    },
    createUser: async (parent, args, context, info) => {
      const payload = jwt.verify(args.input.jwt, config.JWT_SECRET) as {
        email?: string;
      };
      if (payload.email) {
        const user = await createUser({
          firstName: args.input.firstName,
          lastName: args.input.lastName,
          password: args.input.password,
          email: payload.email,
        });
        const token = user?.authorization?.token;
        if (token) {
          context.expressData.res.setHeader('Authorization', token);
          context.expressData.res.cookie('Authorization', token);
          return user;
        }
      }
      return null;
    },
    signupUser: async (parent, args, context, info) => {
      const jwtToken = jwt.sign({ email: args.input.email }, config.JWT_SECRET);
      // TODO send email
      console.log(
        '** jwtToken : ' +
          JSON.stringify({
            jwtToken,
          }),
      );
      return true;
    },
  },
};

export const userSchema: ISchemaElement<Resolvers> = {
  typeDefs,
  resolvers,
};
