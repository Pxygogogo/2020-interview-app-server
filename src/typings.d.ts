import { DefaultContext } from 'koa';
import { Model, Mongoose } from 'mongoose';

export interface CustomContext extends DefaultContext {
  mongo: Mongoose;
  models: { [index: string]: Model<any> }
}
