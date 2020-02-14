import KoaRouter from 'koa-router';
import { readdirSync } from 'fs';
import { join, basename } from 'path';

const router = new KoaRouter();
const files = readdirSync(__dirname);
const filename = basename(__filename);

files.forEach(async file => {
  if (file !== filename) {
    const r = (await import(join(__dirname, file))).default;
    router.use(r.routes()).use(r.allowedMethods());
  }
});

export default router;
