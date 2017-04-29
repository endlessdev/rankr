/// <reference path="../typings/tsd.d.ts"/>

import * as express from "express";
import {Request, Response} from "express"
import {ParserParam} from "../models/ParserParam";
import {CommonParser} from "../utils/CommonParser";
import {CommonHeader} from '../models/CommonHeader';
import {NateParser} from "../utils/NateParser";

let router = express();
let parser = new CommonParser();

let paramNaver: ParserParam = {
    type: "naver",
    url: 'http://www.naver.com',
    querySelector: 'ul.ah_l:first-child li.ah_item > a',
    parserSelector: function ($, elem) {
        var data = $(elem);
        return {
            title: data.find('.ah_k').text(),
            rank: data.find('.ah_r').text(),
        };
    }
};

let paramDaum: ParserParam = {
    type: 'daum',
    url: 'http://www.daum.net',
    querySelector: 'ol.list_hotissue > li .rank_cont:not([aria-hidden])',
    parserSelector: function ($, elem) {
        var data = $(elem);
        return {
            title: data.find('.txt_issue > a').attr('title'),
            rank: '',
            status: data.find("em.rank_result .ir_wa").text(),
            value: data.find("em.rank_result").text().replace(/[^0-9]/g, "")
        }
    }
};

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