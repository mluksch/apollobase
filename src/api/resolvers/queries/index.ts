import { QueryResolvers } from '@generated/graphql';

export const queryResolvers: QueryResolvers = {
  user: async (parent, { email }, context, info) => {
    return context.db.Users.findOne({ email });
  },
  myCat: async (parent, args, context, info) => {
    return context.db.Cats.findOne({
      name: args.name,
    });
  },
};
