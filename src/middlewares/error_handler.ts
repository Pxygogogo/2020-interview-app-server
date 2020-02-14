import { DefaultState, Middleware } from 'koa';
import { CustomContext } from '../typings';

const errorHandler: Middleware<DefaultState, CustomContext> = async (ctx, next) => {
  try {
    await next();
    if (ctx.body) {
      ctx.body = {
        code: 0,
        data: ctx.body,
      };
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message,
    };
  }
};

export default errorHandler;
