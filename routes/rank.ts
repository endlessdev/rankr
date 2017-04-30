/// <reference path="../typings/tsd.d.ts"/>

import * as express from "express";
import {Request, Response} from "express"
import {CommonHeader} from '../models/CommonHeader';

import {CommonParser} from "../utils/CommonParser";
import {NateParser} from "../utils/NateParser";
import {paramNaver} from "../models/params/NaverParam";
import {paramDaum} from "../models/params/DaumParam";

let router = express();
let parser = new CommonParser();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: Function) => {
    res.render('index', {title: 'Express'})
});

router.get('/naver', (req: Request, res: Response, next: Function) => {
    parser.setParam(paramNaver);
    parser.getRank(function (result) {
        res.set(CommonHeader);
        res.send(result);
        return result;
    });
});

router.get('/daum', (req: Request, res: Response, next: Function) => {
    parser.setParam(paramDaum);
    parser.getRank(function (result) {
        res.set(CommonHeader);
        res.send(result);
        return result;
    });
});

router.get('/nate', (req: Request, res: Response, next: Function) => {
    NateParser.getNateRank(rankResult => {
        res.set(CommonHeader);
        res.send(rankResult);
    })
});

export default router;