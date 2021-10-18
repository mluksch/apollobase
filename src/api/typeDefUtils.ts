import * as fs from 'fs';
import * as path from 'path';
import { gql } from 'apollo-server';

const SCHEMA_FOLDER = path.resolve(process.cwd(), 'schema');

const loadTypeDefsFiles = (folder: string) => {
  const results = [];
  const files = fs
    .readdirSync(path.resolve(SCHEMA_FOLDER, folder), {
      encoding: 'utf8',
      withFileTypes: true,
    })
    .filter((file) => file.name.endsWith('.graphql'));
  for (const file of files) {
    const filePath = path.resolve(SCHEMA_FOLDER, folder, file.name);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    results.push(fileContent);
  }
  return results;
};

export const loadTypeDefs = () => {
  const mutations = loadTypeDefsFiles('mutations');
  const queries = loadTypeDefsFiles('query');
  const typeDefs = loadTypeDefsFiles('types');
  return gql`
    ${mutations.join('\n')}
    ${queries.join('\n')}
    ${typeDefs.join('\n')}
  `;
};
