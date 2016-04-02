/**
 * Created by Seungwoo on 2016. 2. 22..
 */
"use strict";

let cheerio = require('cheerio'),
    request = require('request');

var rankData = {
    title: String,
    rank: Number,
    status: String,
    url: String,
    value: String

};

var rankResult = {
    result: {type: Number, default: 0},
    time: Math.floor(Date.now() / 1000),
    type: String,
    data: [rankData]
};

let naverParam = {
    type: 'naver',
    host: 'http://www.naver.com',
    selecter: 'ol#realrank a',
    parserSelecter: function ($, elem) {
        var data = $(elem);
        return {
            title: data.attr('title'),
            status: data.find('.tx').text(),
            rank: '',
            url: data.attr('href'),
            value: data.find('.rk').text()
        };
    }
};

let daumParam = {
    type: 'daum',
    host: 'http://www.daum.net',
    selecter: 'ol#realTimeSearchWord > li > div.roll_txt > div:not(.rank_dummy)',
    parserSelecter: function ($, elem) {
        var data = $(elem);
        return {
            title: realEscape(data.find("span.txt_issue > a").text()),
            rank: '',
            status: data.find("span.screen_out").text(),
            url: data.find("span.txt_issue > a").attr('href'),
            value: data.find("em.img_vert").text()
        }
    }
};

let nateParam = {
    type: 'nate',
    host: 'http://www.nate.com',
    selecter: 'ol#realTimeSearchWord > li > div.roll_txt > div:not(.rank_dummy)',
    parserSelecter: function ($, elem) {
        var data = $(elem);
        return {
            title: data.find("p > a").attr('title').text(),
            rank: '',
            status: data.find("p > em").text(),
            url: data.find("p > a").attr('href')
        }
    }
};

let defaultHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With'
};

exports.naver = function (req, res) {
    getRank(naverParam, function (result) {
        res.set(defaultHeader);
        res.send(result);
    });
};


exports.daum = function (req, res) {
    getRank(daumParam, function (result) {
        res.set(defaultHeader);
        res.send(result);
    });
};


exports.nate = function (req, res) {
    getRank(nateParam, function (result) {
        res.set(defaultHeader);
        res.send(result);
    });
};

function getRank(param, handleResult) {
    let endpoint = param.host;
    request(endpoint, function (err, res, html) {
        if (!err) {
            let $ = cheerio.load(html);
            rankResult.result = 1;
            $(param.selecter).each(function (i, elem) {
                var selectParams = param.parserSelecter($, elem);
                rankResult.type = param.type;
                if (i < 10) {
                    rankResult.data[i] = selectParams;
                    rankResult.data[i].rank = i + 1;
                }
            });
            handleResult(rankResult);
        } else {
            throw err;
        }
    });
}


let realEscape = function (target) {
    return target.replace(/\n/gi, '');
};
