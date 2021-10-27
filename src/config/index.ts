import { getEnv } from '@utils/envs/getEnv';

export const config = {
  NODE_ENV: getEnv('NODE_ENV'),
  DB_URI: getEnv('DB_URI'),
  DB_NAME: getEnv('DB_NAME'),
};
