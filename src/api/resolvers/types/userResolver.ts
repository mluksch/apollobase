import { UserResolvers } from '@generated/graphql';

export const userResolver: UserResolvers = {
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
};
