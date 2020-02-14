import Koa from 'koa';
import config from './config';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello';
});

app.listen(config.port, () => {
  console.log(`The server is running at port 8080`);
});
