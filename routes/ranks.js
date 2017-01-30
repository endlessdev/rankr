/**
 * @author Jade Yeom ysw0094@gmail.com
 * @desc this module will get request ranking data from potal sites
 * @required ../app.js, ../views/routes/index.js
 */

"use strict";
/** for ECMAScript6 **/

let cheerio = require('cheerio'),
    request = require('request'),
    rtj = require('rss-to-json');


let defaultHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With'
};

/**
 * @desc this global params for call from external stuff through getRank method
 * @var naverParam, daumParam, nateParam
 */

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
            title: realStringEscape(data.find("span.txt_issue > a").text()),
            rank: '',
            status: data.find("em.img_vert").text().replace(/[1-9]/g, ''),
            url: data.find("span.txt_issue > a").attr('href'),
            value: parseInt(data.find("em.img_vert").text().replace(/\D/g, ''))
        }
    }
};

let nateParam = {
    type: 'nate',
    host: 'http://www.nate.com',
    selecter: '.kwd_list:not(.type_biz) > ol > li',
    parserSelecter: function ($, elem) {
        var data = $(elem);
        return {
            title: data.find("p > a").attr('title').text(),
            rank: data.find("p > .icon > em"),
            status: data.find("p > em").text(),
            url: data.find("p > a").attr('href'),
            value: '',
        };
    }
};

/**
 * @desc this two global variables for send response with model
 */

var rankData = {
    title: String,
    rank: Number,
    status: String,
    url: String,
    value: Number
};

var rankResult = {
    result: {type: Number, default: 0},
    type: String,
    data: [rankData]
};

exports.naver = function (req, res) {
    getRank(naverParam, function (result) {
        res.set(defaultHeader);
        res.send(result);
        return result;
    });
};


exports.daum = function (req, res) {
    getRank(daumParam, function (result) {
        res.set(defaultHeader);
        res.send(result);
        return result;
    });
};


exports.nate = function (req, res) {
    getRank(nateParam, function (result) {
        res.set(defaultHeader);
        res.send(result);
        return result;
    });
};

exports.rss = function (req, res) {
    rtj.load(req.params.targetURL, function(err, rss){
        if (err) throw err;
        res.set(defaultHeader);
        res.send(rss);
    });
};

/**
 * @param param is contain request param, cheerio parser param
 * @param handleResult Method for Response Handling
 */

function getRank(param, handleResult) {
    let endpoint = param.host;
    console.log(endpoint);
    request(endpoint, function (err, res, html) {
        if (!err) {

            let $ = cheerio.load(html);
            rankResult.result = 1;
            rankResult.type = param.type;
            rankResult.date = new Date();
            $(param.selecter).each(function (i, elem) {
                var selectParams = param.parserSelecter($, elem);
                rankResult.data[i] = selectParams;
                rankResult.data[i].rank = i + 1;
                if (rankResult.data[i].value == null) {
                    delete rankResult.data[i].value;
                }
            });
            handleResult(rankResult);
        } else {
            throw err;
        }
    });
}

/**
 * @param target is escaping target
 * @returns after escape string through regular expression
 */

function realStringEscape(target) {
    return target.replace(/\n/gi, '');
}
