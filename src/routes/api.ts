import KoaRouter from 'koa-router';
import { DefaultState } from 'koa';
import { CustomContext } from '../typings';
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
//热门企业
router.get('/hot-company', async ctx => {
    ctx.body = await request.get('/weixin/mjdq/hot-company');
});
//讨论
router.get('/discuss', async ctx => {
    const { page } = ctx.query;
    ctx.body = (await request.get(`/weixin/mjdq/discuss?page=${page}`)).data;
});
//搜索
router.get('/search', async ctx => {
    const { query, order = "hot", page = 1 } = ctx.query;
    ctx.body = (await request.get(`/weixin/mjdq/search?query=${encodeURIComponent(query)}&order=${order}&page=${page}`)).data;
});
//企业面经
router.get('/company-expierence/', async ctx => {
    const { id, page } = ctx.query
    ctx.body = (await request.get(`/weixin/mjdq/discuss/community/${id}?page=${page}`)).data;
})
//面经详情
router.get('/discuss-info', async ctx => {
    const { discussId } = ctx.query;
    ctx.body = (await request.get(`/discuss/get-discuss-info?discussId=${discussId}`)).data;
});
//面经评论
router.get('/detail', async ctx => {
    const { order = 1, pageSize = 20, entityId, entityType = 8 } = ctx.query;
    ctx.body = (await request.get(`/comment/list-v3?order=${order}&pageSize=${pageSize}&entityId=${entityId}&entityType=${entityType}`)).data;
});
//热门职位
router.get('/hot-job', async ctx => {
    ctx.body = (await request.get('/weixin/mjdq/hot-job')).data;
})


export default router;
