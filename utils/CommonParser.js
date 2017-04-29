"use strict";
var request = require("request");
var cheerio = require("cheerio");
/**
 * Created by jade on 29/04/2017.
 */
var CommonParser = (function () {
    function CommonParser() {
    }
    CommonParser.prototype.setParam = function (parserParam) {
        this.parserParam = parserParam;
    };
    CommonParser.prototype.getRank = function (handleResult) {
        var self = this;
        request(this.parserParam.url, function (err, res, html) {
            if (!err) {
                handleResult(self.handleRankData(html));
            }
            else {
                throw err;
            }
        });
    };
    CommonParser.prototype.handleRankData = function (html) {
        var $ = cheerio.load(html);
        this.rankResult = {
            resultCode: 200,
            rankType: this.parserParam.type,
            requestDate: new Date(),
            data: []
        };
        var self = this;
        self.rankResult.data = [];
        $(this.parserParam.querySelector).each(function (i, elem) {
            var resultData = self.parserParam.parserSelector($, elem);
            var rankData = {
                rank: i + 1,
                value: resultData.value,
                title: resultData.title,
                status: resultData.status
            };
            self.rankResult.data.push(rankData);
        });
        return this.rankResult;
    };
    return CommonParser;
}());
exports.CommonParser = CommonParser;
