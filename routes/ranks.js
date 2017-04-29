/**
 * @author Jade Yeom ysw0094@gmail.com
 * @desc this module will get request ranking data from potal sites
 * @required ../app.js, ../views/routes/index.js
 */

"use strict";
/** for ECMAScript6 **/

let cheerio = require('cheerio'),
    request = require('request'),
    rtj = require('rss-to-json'),
    Iconv = require('iconv').Iconv;

let iconv = new Iconv('euc-kr', 'utf-8');

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
    selector: 'ul.ah_l:first-child li.ah_item > a',
    parserSelector: function ($, elem) {
        var data = $(elem);
        return {
            title: data.find('.ah_k').text(),
            rank: data.find('.ah_r').text(),
        };
    }
};

let daumParam = {
    type: 'daum',
    host: 'http://www.daum.net',
    selector: 'ol.list_hotissue > li .rank_cont:not([aria-hidden])',
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

let nateParam = {
    type: 'nate',
    host: 'http://www.nate.com',
    selector: '.kwd_list:not(.type_biz) > ol > li > p',
    parserSelector: function ($, elem) {
        var data = $(elem);
        return {
            title: data.find('a').attr('title'),
            status: data.find(".icon").text(),
            url: data.find("a").attr('href'),
            value: data.find(".icon > em").text(),
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
    getNateRank(rankResult => {
        res.set(defaultHeader);
        res.send(rankResult);
    });
};

exports.rss = function (req, res) {
    rtj.load(req.params.targetURL, function (err, rss) {
        if (err) throw err;
        res.set(defaultHeader);
        res.send(rss);
    });
};

function getNateRank(onResponse) {
    rankResult.result = 1;
    rankResult.type = "nate";
    rankResult.date = new Date();
    rankResult.data = [];
    let endpoint = "http://www.nate.com/nate5/getlivekeyword";
    var requestOptions = {
        url : endpoint,
        encoding : null
    };
    request(requestOptions, (err, response, html)=> {
        var encodedResponse = iconv.convert(html).toString();
        var parcedResponse = JSON.parse(encodedResponse.replace(/';RSKS.Init\(\);/gi, '').replace(/var arrHotRecent='/gi, ''));
        for (let keyword of parcedResponse) {
            rankResult.data.push({
                rank: keyword[0],
                title: keyword[1],
                status: keyword[2],
                value: keyword[3]
            });
        }
        onResponse(rankResult);
    });
}

/**
 * @param param is contain request param, cheerio parser param
 * @param handleResult Method for Response Handling
 */
function getRank(param, handleResult) {
    let endpoint = param.host;
    console.log(endpoint);
    if (param.type == "nate") {
        //    TODO Using PhantomJS
    } else {
        request(endpoint, function (err, res, html) {
            if (!err) {
                handleRankData(html, param);
                handleResult(rankResult);
            } else {
                throw err;
            }
        });
    }
}

function handleRankData(html, param) {
    let $ = cheerio.load(html);

    rankResult.result = 1;
    rankResult.type = param.type;
    rankResult.date = new Date();
    $(param.selector).each(function (i, elem) {
        var selectParams = param.parserSelector($, elem);
        rankResult.data[i] = selectParams;
        rankResult.data[i].rank = i + 1;
        if (rankResult.data[i].value == null) {
            delete rankResult.data[i].value;
        }
    });
}
