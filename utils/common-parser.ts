import { ParserParam } from '../models/parser-param';
import { RankResult } from '../models/rank-result';
import { Rank } from '../models/rank';
import { changeFormattedStatus } from './formatter';
import { RankStatus } from '../models/rank-status';
import * as request from 'request-promise';
import * as cheerio from 'cheerio';

/**
 * Created by jade on 29/04/2017.
 */


export default class CommonParser {

  private parserParam: ParserParam;
  private rankResult: RankResult;

  public setParam(parserParam: ParserParam) {
    this.parserParam = parserParam;
  }

  public async getRank() {
    try {
      const response = await request.get(this.parserParam.url);
      return this.handleRankData(response);
    } catch (err) {
      return err;
    }
  }

  private handleRankData(html: string) {
    const $: any = cheerio.load(html);

    this.rankResult = {
      resultCode: 200,
      rankType: this.parserParam.type,
      requestDate: new Date(),
      data: [],
    };

    const self = this;
    self.rankResult.data = [];

    $(this.parserParam.querySelector).each((i: number, elem: any) => {
      const resultData = self.parserParam.parserSelector($, elem);
      const rankData: Rank = {
        rank: i + 1,
        value: resultData.value,
        title: resultData.title,
      };
      if (resultData.status) {
        rankData.status = <RankStatus>changeFormattedStatus(resultData.status);
      }
      if (!rankData.value) {
        delete rankData.value;
      }
      self.rankResult.data.push(rankData);
    });
    return this.rankResult;
  }
}
