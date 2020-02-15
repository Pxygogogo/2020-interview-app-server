import KoaRouter from 'koa-router';
import {DefaultState} from 'koa';
import {CustomContext} from '../typings';
import axios from 'axios';

const request = axios.create({
    baseURL: 'https://m.nowcoder.com',
    timeout: 2000,
});

request.interceptors.response.use((res) => {
    return res.data;
});

const router = new KoaRouter<DefaultState, CustomContext>({
    prefix: '/api',
});

router.get('/hot-company', async ctx => {
    ctx.body = await request.get('/weixin/mjdq/hot-company');
});

router.get('/discuss', async ctx => {
    const {page} = ctx.query;
    ctx.body = (await request.get(`/weixin/mjdq/discuss?page=${page}`)).data;
});

router.get('/search', async ctx => {
    const {query, order, page} = ctx.query;
    ctx.body = (await request.get(`/weixin/mjdq/search?query=${query}&order=${order}&page=${page}`)).data;
});

router.use(async ctx => {
    const {discussId} = ctx.query;
    ctx.body = (await request.get(`/discuss/get-discuss-info?discussId=${discussId}`)).data;
});

router.use(async ctx => {
    const {order = 1, pageSize = 20, entityId, entityType = 8} = ctx.query;
    ctx.body = (await request.get(`/comment/list-v3?order=${order}&pageSize=${pageSize}&entityId=${entityId}&entityType=${entityType}`)).data;
});

router.use(async ctx => {
    const {entityId, entityType} = ctx.query;
    ctx.body = (await request.get(`/comment/wonderful/list?entityId=${entityId}&entityType=${entityType}`)).data;

});

export default router;
