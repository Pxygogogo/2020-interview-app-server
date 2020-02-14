import KoaRouter from 'koa-router';

const router = new KoaRouter({
  prefix: '/auth',
});

router.post('/login', async (ctx) => {
  ctx.body = 'login';
});

export default router;
