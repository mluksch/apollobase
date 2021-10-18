import { Resolvers } from '@generated/graphql';
import { IContext } from '@api/context';
import { mutationResolvers } from '@api/resolvers/mutations';
import { queryResolvers } from '@api/resolvers/queries';
import { userResolver } from '@api/resolvers/types/userResolver';

export const rootResolver: Resolvers<IContext> = {
  Mutation: mutationResolvers,
  Query: queryResolvers,
  User: userResolver,
};
