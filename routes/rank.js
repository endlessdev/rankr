/// <reference path="../typings/tsd.d.ts"/>
"use strict";
const express = require("express");
const CommonHeader_1 = require('../models/CommonHeader');
const CommonParser_1 = require("../utils/CommonParser");
const NateParser_1 = require("../utils/NateParser");
const NaverParam_1 = require("../models/params/NaverParam");
const DaumParam_1 = require("../models/params/DaumParam");
let router = express();
let parser = new CommonParser_1.CommonParser();
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
router.get('/naver', (req, res, next) => {
    parser.setParam(NaverParam_1.paramNaver);
    parser.getRank(function (result) {
        res.set(CommonHeader_1.CommonHeader);
        res.send(result);
        return result;
    });
});
router.get('/daum', (req, res, next) => {
    parser.setParam(DaumParam_1.paramDaum);
    parser.getRank(function (result) {
        res.set(CommonHeader_1.CommonHeader);
        res.send(result);
        return result;
    });
});
router.get('/nate', (req, res, next) => {
    NateParser_1.NateParser.getNateRank(rankResult => {
        res.set(CommonHeader_1.CommonHeader);
        res.send(rankResult);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
