import KoaRouter from 'koa-router';
import {DefaultState} from 'koa';
import {CustomContext} from '../typings';
import axios, {AxiosResponse} from 'axios'

const request = axios.create({
    baseURL: 'https://m.nowcoder.com',
    timeout: 2000,
});

request.interceptors.response.use((res) => {
    return res.data
});

const router = new KoaRouter<DefaultState, CustomContext>({
    prefix: '/api',
});

router.get('/hot-company', async (ctx, next) => {
    ctx.body = await request.get('/weixin/mjdq/hot-company')
});

router.get('/discuss', async (ctx, next) => {
    const {page} = ctx.query;
    ctx.body = await request.get(`/weixin/mjdq/discuss?page=${page}`);
    await next();
})

router.get('/search', async (ctx, next) => {
    const {query, order, page} = ctx.query;
    ctx.body = await request.get(`/weixin/mjdq/search?query=${query}&order=${order}&page=${page}`)
});

router.use(async (ctx, next) => {
    const {discussId} = ctx.query;
    ctx.body = await request.get(`/discuss/get-discuss-info?discussId=${discussId}`)
})

router.use(async (ctx, next) => {
    const {order = 1, pageSize = 20, entityId, entityType = 8} = ctx.query
    ctx.body = await request.get(`/comment/list-v3?order=${order}&pageSize=${pageSize}&entityId=${entityId}&entityType=${entityType}`);
})

router.use(async (ctx, next) => {
    const {entityId, entityType} = ctx.query;
    ctx.body = await request.get(`/comment/wonderful/list?entityId=${entityId}&entityType=${entityType}`)
})


router.use((ctx, next) => {
    if (ctx.body.code === 0) {
        ctx.body = ctx.body.data;
    } else {
        throw new Error('官方接口请求出问题')
    }
});


export default router;
