import KoaRouter from 'koa-router';
import { DefaultState } from 'koa';
import { CustomContext } from '../typings';

const router = new KoaRouter<DefaultState, CustomContext>({
  prefix: '/users',
});

router.get('/current-user', async (ctx) => {
  ctx.body = await ctx.models.User.findById(ctx.id);
});

export default router;
