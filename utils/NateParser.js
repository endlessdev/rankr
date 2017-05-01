"use strict";
const request = require("request");
const Formatter_1 = require("../utils/Formatter");
const Iconv = require('iconv').Iconv;
const iconv = new Iconv('euc-kr', 'utf-8');
class NateParser {
    static getNateRank(onResponse) {
        let rankResult = {
            resultCode: 200,
            rankType: "nate",
            requestDate: new Date(),
            data: []
        };
        const requestOptions = {
            url: this.API_ENDPOINT,
            encoding: null
        };
        request(requestOptions, (err, response, html) => {
            let encodedResponse = iconv.convert(html).toString();
            let parsedResponse = JSON.parse(encodedResponse.replace(/';RSKS.Init\(\);/gi, '').replace(/var arrHotRecent='/gi, ''));
            for (let keyword of parsedResponse) {
                rankResult.data.push({
                    rank: keyword[0],
                    title: keyword[1],
                    status: Formatter_1.changeFormattedStatus(keyword[2]),
                    value: keyword[3]
                });
            }
            onResponse(rankResult);
        });
    }
}
NateParser.API_ENDPOINT = "http://www.nate.com/nate5/getlivekeyword";
exports.NateParser = NateParser;
