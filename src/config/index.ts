import * as dotenv from 'dotenv';
import { getEnv } from '@utils/getEnv';
dotenv.config();

export const config = {
  DB_URI: getEnv('DB_URI'),
};
