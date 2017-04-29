/// <reference path="../typings/tsd.d.ts"/>
"use strict";
var express = require("express");
var CommonParser_1 = require("../utils/CommonParser");
var CommonHeader_1 = require('../models/CommonHeader');
var NateParser_1 = require("../utils/NateParser");
var router = express();
var parser = new CommonParser_1.CommonParser();
var paramNaver = {
    type: "naver",
    url: 'http://www.naver.com',
    querySelector: 'ul.ah_l:first-child li.ah_item > a',
    parserSelector: function ($, elem) {
        var data = $(elem);
        return {
            title: data.find('.ah_k').text(),
            rank: data.find('.ah_r').text()
        };
    }
};
var paramDaum = {
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
        };
    }
};
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/naver', function (req, res, next) {
    parser.setParam(paramNaver);
    parser.getRank(function (result) {
        res.set(CommonHeader_1.CommonHeader);
        res.send(result);
        return result;
    });
});
router.get('/daum', function (req, res, next) {
    parser.setParam(paramDaum);
    parser.getRank(function (result) {
        res.set(CommonHeader_1.CommonHeader);
        res.send(result);
        return result;
    });
});
router.get('/nate', function (req, res, next) {
    NateParser_1.NateParser.getNateRank(function (rankResult) {
        res.set(CommonHeader_1.CommonHeader);
        res.send(rankResult);
    });
});
exports.__esModule = true;
exports["default"] = router;
