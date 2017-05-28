import {RankResult} from "../models/RankResult";

const Iconv = require('iconv').Iconv;
const iconv = new Iconv('euc-kr', 'utf-8'),
    request = require('request');

export class GoogleParser {

    private static API_ENDPOINT = "https://trends.google.co.kr/trends/hottrends/hotItems";

    public static getGoogleTrend(requestDate, onResponse) {

        let rankResult: RankResult = {
            resultCode: 200,
            rankType: "google",
            requestDate: new Date(),
            data: []
        };

        const requestOptions = {
            url: this.API_ENDPOINT,
            encoding: null,
            form: {
                ajax: 1,
                pn: "p23",
                htd: requestDate,
                htv: "l"
            }
        };

        request(requestOptions, (err, response, html)=> {
            let encodedResponse = iconv.convert(html).toString();
            let parsedResponse = JSON.parse(encodedResponse);

            onResponse(rankResult);
        });
    }
}