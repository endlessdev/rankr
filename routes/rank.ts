/// <reference path="../typings/tsd.d.ts"/>

import * as Router from 'koa-router'

import CommonParser from "../utils/CommonParser";
import NateParser from "../utils/NateParser";
import paramNaver from "../models/params/NaverParam";
import paramDaum from "../models/params/DaumParam";
import async = Q.async;
let parser = new CommonParser();

const router = new Router({prefix: '/rank'});

/* GET home page. */

router.get('/naver', async (ctx, next) => {
    parser.setParam(paramNaver);
    ctx.body = await parser.getRank();
});

router.get('/daum', async (ctx, next) => {
    parser.setParam(paramDaum);
    ctx.body = await parser.getRank();
});

router.get('/nate', async (ctx, next) => {
    ctx.body = await NateParser.getNateRank()
});


export default router;
