import { QueryResolvers } from '@generated/graphql';

export const queryResolvers: QueryResolvers = {
  user: async (parent, { email }, context, info) => {
    return context.db.Users.findOne({ email });
  },
};
