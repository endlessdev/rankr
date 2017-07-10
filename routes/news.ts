/// <reference path="../typings/tsd.d.ts"/>

import * as Router from 'koa-router';
import * as timezone from 'moment-timezone';

import async = Q.async;
import newsParser from '../utils/news-parser';

const router = new Router({ prefix: '/news' });

timezone().tz('Asia/Seoul').format();

router.get('/:keyword', async (ctx) => {
  ctx.body = newsParser.getNewsDataByKeyword(ctx.params.keyword);
});

export default router;
