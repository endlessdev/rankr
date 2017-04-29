import {ParserParam} from "../models/ParserParam";
import {RankResult} from "../models/RankResult";
import {Rank} from "../models/Rank";
import * as request from "request";
import * as cheerio from "cheerio";

/**
 * Created by jade on 29/04/2017.
 */

export class CommonParser {

    private parserParam: ParserParam;
    private rankResult: RankResult;

    public setParam(parserParam: ParserParam) {
        this.parserParam = parserParam;
    }

    public getRank(handleResult: Function) {
        let self = this;
        request(this.parserParam.url, function (err, res, html) {
            if (!err) {
                handleResult(self.handleRankData(html));
            } else {
                throw err;
            }
        });
    }

    private handleRankData(html: string) {
        let $: any = cheerio.load(html);

        this.rankResult = {
            resultCode: 200,
            rankType: this.parserParam.type,
            requestDate: new Date(),
            data: []
        };

        let self = this;
        self.rankResult.data = [];

        $(this.parserParam.querySelector).each(function (i: number, elem: any) {
            let resultData = self.parserParam.parserSelector($, elem);
            let rankData: Rank = {
                rank: i + 1,
                value: resultData.value,
                title: resultData.title,
                status : resultData.status
            };
            self.rankResult.data.push(rankData);
        });

        return this.rankResult;
    }
}