import {RankResult} from "../models/RankResult";
import {changeFormattedStatus} from "../utils/Formatter";

const iconv = require('iconv-lite'),
    request = require('request');

export class NateParser {

    private static API_ENDPOINT = "http://www.nate.com/nate5/getlivekeyword";

    public static getNateRank(onResponse) {


        let rankResult: RankResult = {
            resultCode: 200,
            rankType: "nate",
            requestDate: new Date(),
            data: []
        };

        const requestOptions = {
            url: this.API_ENDPOINT,
            encoding: null
        };

        request(requestOptions, (err, response, html)=> {
            let encodedResponse = iconv.decode(html, 'UTF-8').toString();
            let parsedResponse = JSON.parse(encodedResponse.replace(/';RSKS.Init\(\);/gi, '').replace(/var arrHotRecent='/gi, ''));
            for (let keyword of parsedResponse) {
                rankResult.data.push({
                    rank: keyword[0],
                    title: keyword[1],
                    status: changeFormattedStatus(keyword[2]),
                    value: keyword[3]
                });
            }
            onResponse(rankResult);
        });
    }
}