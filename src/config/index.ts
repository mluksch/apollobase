import { getEnv } from '@utils/getEnv';

export const config = {
  DB_URI: getEnv('DB_URI'),
};
