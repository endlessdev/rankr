/**
 * Created by Seungwoo on 2016. 3. 14..
 */

var cheerio = require('cheerio'),
    request = require('request');

var rankData = {
    title: String,
    rank: Number,
    status: String,
    url: String
};

var rankResult = {
    result: {type: Number, default: 0},
    time: Math.floor(Date.now() / 1000),
    type: {type: String},
    data: [rankData]
};

exports.naver = function (req, response, next) {
    var url = 'http://www.naver.com';

    request(url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            rankResult.result = 1;
            rankResult.type = 'naver';
            $('ol#realrank a').each(function (i, elem) {

                var data = $(this);

                if (i < 10) {
                    rankResult.data[i] = {
                        title: data.attr('title'),
                        rank: i + 1,
                        status: data.first().find('.tx').text(),
                        url: data.attr('href')
                    };
                }
                rankResult.type = 'naver';

            });

            response.setHeader('Content-Type', 'application/json');
            response.send(rankResult);

        } else {
            throw err;
        }
    })
};

exports.daum = function (req, response, next) {
    var url = 'http://www.daum.net';

    request(url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            rankResult.result = 1;
            rankResult.type = 'daum';
            $('ol#realTimeSearchWord > li > div.roll_txt > div:not(.rank_dummy)').each(function (i, elem) {

                var data = $(this);

                if (i < 10) {
                    rankResult.data[i] = {
                        title: realEscape(data.find("span.txt_issue > a").text()),
                        rank: i + 1,
                        status: data.find("span.screen_out").text(),
                        url: data.find("span.txt_issue > a").attr('href')
                    };
                }
            });

            response.setHeader('Content-Type', 'application/json');
            response.send(rankResult);

        } else {
            throw err;
        }
    })
};

exports.nate = function (req, response, next) {
    var url = 'http://www.nate.com';

    request(url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            rankResult.result = 1;
            rankResult.type = 'nate';
            $('div.area_rtkwd.type_alone div.kwd_list ol li').each(function (i, elem) {

                var data = $(this);

                console.log(data.text());

                if (i < 10) {
                    rankResult.data[i] = {
                        title: data.find("p > a").attr('title').text(),
                        rank: i + 1,
                        status: data.find("p > em").text(),
                        url: data.find("p > a").attr('href')
                    };
                }
            });

            response.setHeader('Content-Type', 'application/json');
            response.send(rankResult);

        } else {
            throw err;
        }
    })
};

var realEscape = function (target) {
    return target.replace(/\n/gi, '');
};