import KoaRouter from 'koa-router';
import { DefaultState } from 'koa';
import { CustomContext } from '../typings';

const router = new KoaRouter<DefaultState, CustomContext>({
  prefix: '/test',
});

router.get('/', async (ctx) => {
  ctx.body = `Hello, world! ${Math.random()}`;
});

export default router;
