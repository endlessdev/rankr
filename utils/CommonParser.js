"use strict";
const Formatter_1 = require("../utils/Formatter");
const request = require("request");
const cheerio = require("cheerio");
/**
 * Created by jade on 29/04/2017.
 */
class CommonParser {
    setParam(parserParam) {
        this.parserParam = parserParam;
    }
    getRank(handleResult) {
        let self = this;
        request(this.parserParam.url, function (err, res, html) {
            if (!err) {
                handleResult(self.handleRankData(html));
            }
            else {
                throw err;
            }
        });
    }
    handleRankData(html) {
        let $ = cheerio.load(html);
        this.rankResult = {
            resultCode: 200,
            rankType: this.parserParam.type,
            requestDate: new Date(),
            data: []
        };
        let self = this;
        self.rankResult.data = [];
        $(this.parserParam.querySelector).each(function (i, elem) {
            let resultData = self.parserParam.parserSelector($, elem);
            let rankData = {
                rank: i + 1,
                value: resultData.value,
                title: resultData.title,
            };
            if (resultData.status) {
                rankData.status = Formatter_1.changeFormattedStatus(resultData.status);
            }
            self.rankResult.data.push(rankData);
        });
        return this.rankResult;
    }
}
exports.CommonParser = CommonParser;
