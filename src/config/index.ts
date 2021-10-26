import { getEnv } from '@utils/envs/getEnv';

export const config = {
  DB_URI: getEnv('DB_URI'),
};
