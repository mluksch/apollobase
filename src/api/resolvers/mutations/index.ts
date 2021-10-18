import { MutationResolvers } from '@generated/graphql';

export const mutationResolvers: MutationResolvers = {
  loginUser: (parent, args, context, info) => {
    return null;
  },
  registerCat: async (parent, args, context, info) => {
    const cat = await context.db.Cats.findOne({
      name: args.input.name,
    });
    if (cat) {
      throw new Error('Cat with this name already exist!');
    }
    const { insertedId } = await context.db.Cats.insertOne({
      name: args.input.name,
    });
    return context.db.Cats.findOne({ _id: insertedId });
  },
  addBestFriend: async (parent, args, context, info) => {
    const cat = await context.db.Cats.findOne({
      name: args.input.catName,
    });
    if (!cat) {
      throw new Error('Cat does not exist!');
    }
    const bestFriend = await context.db.Cats.findOne({
      name: args.input.bestFriendName,
    });
    if (!bestFriend) {
      throw new Error('Best friend does not exist!');
    }
    const updated = await context.db.Cats.findOneAndUpdate(
      { _id: cat._id },
      { $set: { bestFriend: bestFriend._id } },
    );
    return updated.value;
  },
};
