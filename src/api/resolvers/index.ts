import { Resolvers } from '@generated/graphql';
import { IContext } from '@api/context';
import { mutationResolvers } from '@api/resolvers/mutations';
import { queryResolvers } from '@api/resolvers/queries';
import { userResolver } from '@api/resolvers/types/userResolver';
import { catResolver } from '@api/resolvers/types/catResolver';

export const rootResolver: Resolvers<IContext> = {
  Mutation: mutationResolvers,
  Query: queryResolvers,
  User: userResolver,
  Cat: catResolver,
};
