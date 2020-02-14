import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
  path: resolve(__dirname, '.env'),
});

export default {
  port: process.env.PORT || 8080,
  appId: process.env.APP_ID || '',
  appSecret: process.env.APP_SECRET || '',
  mongo: process.env.MONGO || 'mongodb://localhost:27018/interview',
  jwtKey: '2020-InTeRvIeW',
};
