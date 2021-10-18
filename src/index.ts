import { ApolloServer } from 'apollo-server';
import { createContext } from '@api/context';
import { loadTypeDefs } from '@api/typeDefUtils';
import { rootResolver } from '@api/resolvers';
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

(async () => {
  const server = new ApolloServer({
    typeDefs: loadTypeDefs(),
    resolvers: rootResolver,
    context: createContext,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
    ],
  });
  const { url } = await server.listen();
  console.log(`Server started at "${url}"...`);
})();
