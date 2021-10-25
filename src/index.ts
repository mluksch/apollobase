import { ApolloServer } from 'apollo-server';
import { createContextFn } from './context';
import { rootSchema } from '@schema/index';

const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

(async () => {
  try {
    const contextFn = await createContextFn();
    const server = new ApolloServer({
      typeDefs: rootSchema.typeDefs,
      resolvers: rootSchema.resolvers,
      context: contextFn,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          // options
        }),
      ],
    });
    const { url } = await server.listen();
    console.log(`Server started at "${url}"...`);
  } catch (e) {
    console.error(e);
  }
})();
