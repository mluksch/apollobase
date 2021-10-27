import { DocumentNode } from 'graphql';
import { gql } from 'apollo-server';
import { resolvers, typeDefs } from 'graphql-scalars';
import { merge } from 'lodash';

export type ISchemaElement<R> = {
  typeDefs: DocumentNode;
  resolvers: R;
};

const BASE_TYPE_DEFS = gql`
  type Query
  type Mutation
`;

const GRAPHQL_SCALARS_TYPE_DEFS = gql`
  ${typeDefs.join('\n')}
`;

// generateSchema:
// elements = [ISchemaElement<Resolvers>, { typeDefs: gql`extends Query {}; extends Mutation {}; type ...`, resolvers: { Query: ..., Mutation: ..., ... } }, ...]
export const generateSchema = <RESOLVERS>(
  elements: ISchemaElement<RESOLVERS>[],
): {
  typeDefs: DocumentNode[];
  resolvers: RESOLVERS;
} => {
  return {
    typeDefs: [
      BASE_TYPE_DEFS,
      GRAPHQL_SCALARS_TYPE_DEFS,
      ...elements.map((element) => element.typeDefs),
    ],
    resolvers: merge(
      resolvers,
      ...elements.map((element) => element.resolvers),
    ),
  };
};
