import {RankResult} from "../models/RankResult";
import {changeFormattedStatus} from "../utils/Formatter";

const iconv = require('iconv-lite'),
    request = require('request-promise');

export default class NateParser {

    private static API_ENDPOINT = "http://www.nate.com/nate5/getlivekeyword";

    public static async getNateRank() {

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

        const response = await request(requestOptions);
        let encodedResponse = iconv.decode(response, 'EUC-KR').toString();
        let parsedResponse = JSON.parse(encodedResponse.replace(/';RSKS.Init\(\);/gi, '').replace(/var arrHotRecent='/gi, ''));

        for (let keyword of parsedResponse) {
            rankResult.data.push({
                rank: keyword[0],
                title: keyword[1],
                status: changeFormattedStatus(keyword[2]),
                value: keyword[3]
            });
        }

        return rankResult;
    }
}