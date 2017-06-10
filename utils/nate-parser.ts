import { RankResult } from '../models/rank-result';
import { changeFormattedStatus } from './formatter';
import * as request from 'request-promise';
import * as iconv from 'iconv-lite';

export default class NateParser {

  private static API_ENDPOINT = 'http://www.nate.com/nate5/getlivekeyword';

  public static async getNateRank() {

    const rankResult: RankResult = {
      resultCode: 200,
      rankType: 'nate',
      requestDate: new Date(),
      data: [],
    };

    const requestOptions = {
      url: this.API_ENDPOINT,
      encoding: null,
    };

    const response = await request(requestOptions);
    const encodedResponse = iconv.decode(response, 'EUC-KR').toString();
    const parsedResponse = JSON.parse(encodedResponse
      .replace(/';RSKS.Init\(\);/gi, '').replace(/var arrHotRecent='/gi, ''));

    for (const keyword of parsedResponse) {
      rankResult.data.push({
        rank: keyword[0],
        title: keyword[1],
        status: changeFormattedStatus(keyword[2]),
        value: keyword[3],
      });
    }

    return rankResult;
  }
}
