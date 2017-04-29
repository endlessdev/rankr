import {RankResult} from "../models/RankResult";
import * as request from "request";

const Iconv = require('iconv').Iconv;
const iconv = new Iconv('euc-kr', 'utf-8');

export class NateParser {
    public static getNateRank(onResponse) {

        let rankResult:RankResult = {
            resultCode : 200,
            rankType : "nate",
            requestDate : new Date(),
            data : []
        };

        const endpoint = "http://www.nate.com/nate5/getlivekeyword";

        const requestOptions = {
            url: endpoint,
            encoding: null
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
}