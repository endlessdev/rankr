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

  private static instance: CommonParser;

  private parserParam: ParserParam;
  private rankResult: RankResult;

  constructor() {

  }

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  set param(parserParam: ParserParam) {
    this.parserParam = parserParam;
  }

  async getRank() {
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

    this.rankResult.data = [];

    $(this.parserParam.querySelector).each((i: number, elem: any) => {
      const resultData = this.parserParam.parserSelector($, elem);
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
      this.rankResult.data.push(rankData);
    });
    return this.rankResult;
  }


}
