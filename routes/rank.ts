/// <reference path="../typings/tsd.d.ts"/>

import * as Router from 'koa-router'

import CommonParser from "../utils/common-parser";
import NateParser from "../utils/nate-parser";
import paramNaver from "../models/params/naver-param";
import paramDaum from "../models/params/daum-param";
import {paramZum} from "../models/params/zum-param";

import async = Q.async;
let parser = new CommonParser();

const router = new Router({prefix: '/v1/rank'});

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

router.get('/zum', async (ctx, next) => {
    parser.setParam(paramZum);
    ctx.body = await parser.getRank();
});

router.get('/all', async (ctx, next) => {
    let response = {};
    parser.setParam(paramNaver);
    response['naver'] = (await parser.getRank()).data;
    parser.setParam(paramDaum);
    response['daum'] = (await parser.getRank()).data;
    response['nate'] = (await NateParser.getNateRank()).data;
    parser.setParam(paramZum);
    response['zum'] = (await parser.getRank()).data;

    ctx.body = response;
});

export default router;
