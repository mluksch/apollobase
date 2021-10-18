import { CatResolvers } from '@generated/graphql';
import { ObjectId } from 'mongodb';

export const catResolver: CatResolvers = {
  id: async (parent, args, context, info) => {
    return parent._id.toHexString();
  },
  name: async (parent, args, context, info) => {
    return parent.name;
  },
  bestFriend: async (parent, args, context, info) => {
    return parent?.bestFriend
      ? context.db.Cats.findOne({ _id: new ObjectId(parent?.bestFriend) })
      : null;
  },
};
