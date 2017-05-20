/// <reference path="../typings/tsd.d.ts"/>

import Router from 'koa-router'
import CommonHeader from '../models/CommonHeader';

import CommonParser from "../utils/CommonParser";
import NateParser from "../utils/NateParser";
import paramNaver from "../models/params/NaverParam";
import paramDaum from "../models/params/DaumParam";

let parser = new CommonParser();

/* GET home page. */
router.get('/naver', (ctx, next) => {
  parser.setParam(paramNaver)
  ctx.body = await parser.getRank()
})

router.get('/daum', (ctx, next) => {
  parser.setParam(paramDaum)
  ctx.body = await parser.getRank()
})

router.get('/nate', (ctx, next) => {
  ctx.body = await Nateparser.getNateRank()
})

export default router;
