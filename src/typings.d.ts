import { DefaultContext } from 'koa';
import { Model, Mongoose } from 'mongoose';

export interface CustomContext extends DefaultContext {
  mongo: Mongoose;
  models: { [index: string]: Model<any> }
  id: string;
}

export interface WechatUserInfo {
  avatarUrl: string;
  city: string;
  country: string;
  gender: number;
  language: string;
  nickName: string
  province: string;
}

export interface UserInfo extends WechatUserInfo {
  _id: string;
  create_at: string;
  update_at: string;
}
