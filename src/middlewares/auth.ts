import { DefaultState, Middleware } from 'koa';
import jwt from 'jsonwebtoken';
import config from '../config';
import { CustomContext } from '../typings';

const PUBLIC_URL_REGX = /^\/[auth|test]/;
const errorHandler: Middleware<DefaultState, CustomContext> = async (ctx, next) => {
  if (!PUBLIC_URL_REGX.test(ctx.url)) {
    let token = ctx.get('authorization');
    token = token.substring(7);
    const payload: any = jwt.verify(token, config.jwtKey);
    ctx.id = payload.id;
  }
  await next();
};

export default errorHandler;
