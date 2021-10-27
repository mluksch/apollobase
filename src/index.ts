import { ApolloServer } from 'apollo-server';
import { getEnv } from '@utils/envs/getEnv';
import { connectDB, IModels } from '@db/index';
import { createContextProducer } from '@utils/graphql/createContextProducer';
import { generateSchema } from '@utils/graphql/createSchema';
import { Resolvers } from '@generated/graphql';
import { userSchema } from '@schema/userSchema';
import { carSchema } from '@schema/carSchema';

const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

(async () => {
  try {
    // create db:
    const db = await connectDB();

    // create context producer:
    const contextProducer = await createContextProducer<IModels>({
      db,
      contextDataProducer: async (expressData) => {
        return {};
      },
    });

    // create root-schema:
    const rootSchema = generateSchema<Resolvers>([userSchema, carSchema]);

    // create apollo server:
    const server = new ApolloServer({
      typeDefs: rootSchema.typeDefs,
      resolvers: rootSchema.resolvers,
      context: contextProducer,
      // dont use introspection in production:
      // https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/
      introspection: getEnv('NODE_ENV') !== 'production',
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          // options
        }),
      ],
    });

    // start server:
    const { url } = await server.listen();
    console.log(`Server started at "${url}"...`);
  } catch (e) {
    console.error(e);
  }
})();
