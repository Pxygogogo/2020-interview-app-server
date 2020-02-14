import Koa, { DefaultState } from 'koa';
import { readdirSync } from 'fs';
import { basename, join } from 'path';
import mongoose from 'mongoose';
import config from '../config';
import { CustomContext } from '../typings';

export default async (app: Koa<DefaultState, CustomContext>) => {
  const db = await mongoose.connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const files = readdirSync(__dirname);
  for (let file of files) {
    if (file === basename(__filename)) continue;
    const model = (await import(join(__dirname, file))).default;
    db.model(model.name, model.schema, model.collection);
  }
  app.context.mongo = db;
  app.context.models = db.models;
};
