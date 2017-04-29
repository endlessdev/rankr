"use strict";
var request = require("request");
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('euc-kr', 'utf-8');
var NateParser = (function () {
    function NateParser() {
    }
    NateParser.getNateRank = function (onResponse) {
        var rankResult = {
            resultCode: 200,
            rankType: "nate",
            requestDate: new Date(),
            data: []
        };
        var endpoint = "http://www.nate.com/nate5/getlivekeyword";
        var requestOptions = {
            url: endpoint,
            encoding: null
        };
        request(requestOptions, function (err, response, html) {
            var encodedResponse = iconv.convert(html).toString();
            var parcedResponse = JSON.parse(encodedResponse.replace(/';RSKS.Init\(\);/gi, '').replace(/var arrHotRecent='/gi, ''));
            for (var _i = 0, parcedResponse_1 = parcedResponse; _i < parcedResponse_1.length; _i++) {
                var keyword = parcedResponse_1[_i];
                rankResult.data.push({
                    rank: keyword[0],
                    title: keyword[1],
                    status: keyword[2],
                    value: keyword[3]
                });
            }
            onResponse(rankResult);
        });
    };
    return NateParser;
}());
exports.NateParser = NateParser;
