import Koa, { DefaultState } from 'koa';
import KoaBody from 'koa-body';
import config from './config';
import { CustomContext } from './typings';

const app = new Koa<DefaultState, CustomContext>();
app.use(KoaBody());

app.listen(config.port, () => {
  console.log(`The server is running at port 8080`);
});
