import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
  path: resolve(__dirname, '.env'),
});

export default {
  port: process.env.PORT || 8080,
  appid: process.env.APP_ID || '',
  appsecret: process.env.APP_SECRET || '',
  mongo: process.env.MONGO || 'mongodb://localhost:27018/interview',
};
