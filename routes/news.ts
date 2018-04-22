/// <reference path="../typings/tsd.d.ts"/>

import * as Router from 'koa-router';
import * as timezone from 'moment-timezone';

import async = Q.async;
import naverParser from '../parsers/naver-parser';

const router = new Router({ prefix: '/v1/news' });

timezone().tz('Asia/Seoul').format();

router.get('/:keyword', async (ctx) => {
  ctx.body = await naverParser.getNewsDataByKeyword(ctx.params.keyword);
});

export default router;
