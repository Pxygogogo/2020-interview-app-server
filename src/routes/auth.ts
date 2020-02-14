import KoaRouter from 'koa-router';
import { DefaultState } from 'koa';
import { CustomContext } from '../typings';

const router = new KoaRouter<DefaultState, CustomContext>({
  prefix: '/auth',
});

router.post('/login', async (ctx) => {
  ctx.body = 'login';
});

export default router;
