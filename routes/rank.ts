/// <reference path="../typings/tsd.d.ts"/>

import * as Router from 'koa-router';

import commonParser from '../utils/common-parser';
import nateParser from '../utils/nate-parser';
import naverParam from '../models/params/naver-param';
import daumParam from '../models/params/daum-param';
import { paramZum } from '../models/params/zum-param';

import async = Q.async;
const parser = commonParser.Instance;

const router = new Router({ prefix: '/v1/rank' });

/* GET home page. */

router.get('/naver', async (ctx, next) => {
  parser.param = naverParam;
  ctx.body = await parser.getRank();
});

router.get('/daum', async (ctx, next) => {
  parser.param = daumParam;
  ctx.body = await parser.getRank();
});

router.get('/nate', async (ctx, next) => {
  ctx.body = await nateParser.getNateRank();
});

router.get('/zum', async (ctx, next) => {
  parser.param = paramZum;
  ctx.body = await parser.getRank();
});


router.get('/all', async (ctx, next) => {

  const response = {};
  parser.param = naverParam;
  response['naver'] = (await parser.getRank()).data;
  parser.param = daumParam;
  response['daum'] = (await parser.getRank()).data;
  response['nate'] = (await nateParser.getNateRank()).data;
  parser.param = paramZum;
  response['zum'] = (await parser.getRank()).data;

  ctx.body = response;
});

export default router;
