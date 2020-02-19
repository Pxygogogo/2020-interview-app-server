import KoaRouter from 'koa-router';
import { DefaultState } from 'koa';
import wechatApi from '../utils/wechat_api';
import { CustomContext, WechatUserInfo } from '../typings';
import jwt from 'jsonwebtoken';
import config from '../config';

const router = new KoaRouter<DefaultState, CustomContext>({
  prefix: '/auth',
});

router.post('/login', async (ctx) => {
  const { code, userInfo } = ctx.request.body as { code: string, userInfo: WechatUserInfo };
  if (!code || !userInfo) throw Error('缺少参数');
  const res = await wechatApi.auth.code2Session(code);
  console.log(res);
  if (typeof res.openid === 'undefined') throw Error('登录失败');
  let user = await ctx.models.User.findOne({ openid: res.openid });
  if (!user) {
    user = await ctx.models.User.create({
      openid: res.openid,
      ...userInfo,
    });
  }
  const token = jwt.sign({
    id: user._id,
  }, config.jwtKey, {
    expiresIn: 3600,
  });
  ctx.body = {
    token,
    user,
  };
});

export default router;
