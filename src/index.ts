import Koa, {DefaultState} from 'koa';
import KoaBody from 'koa-body';
import config from './config';
import loadMongoose from './models';
import routers from './routes';
import errorHandler from './middlewares/error_handler';
import auth from './middlewares/auth';
import {CustomContext} from './typings';

const app = new Koa<DefaultState, CustomContext>();
app.use(KoaBody());
loadMongoose(app);
app.use(errorHandler);
app.use(auth);

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.port, () => {
    console.log(`The server is running at port 8080`);
});
