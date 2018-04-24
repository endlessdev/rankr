import * as request from 'request-promise';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import delay from '../utils/delay';
import { Parser } from './parser';
import commonHeaders from './common-headers';
import { NewsContent } from './news-content';
import logger from '../utils/logger';

export default class NaverParser implements Parser{

  public async getNewsContent(newsURL: string): Promise<NewsContent> {
    try {
      await delay(5000);
      const response = await request({
        uri: newsURL,
        headers: commonHeaders,
        encoding: null,
      });

      let $ = cheerio.load(response);
      $('script').remove();
      const encodedResponse = iconv.decode(response, $('meta[charset]').attr('charset')).toString();
      $ = cheerio.load(encodedResponse);

      const newsTitle = $('meta[property=\'og:title\']').attr('content');
      const newsContent = $('#articeBody, #newsEndContents, #articleBodyContents');

      return {
        title: newsTitle,
        content: newsContent.html(),
        plain_text: newsContent.text(),
        press: $('.press_logo img, #pressLogo img').attr('alt'),
        link: newsURL,
      };
    } catch (err) {
      logger.error(err);
    }
  }

  public async getNewsList(searchKeyword: string, page: number): Promise<[any]> {
    const newsData: any = [];
    const queryURL = `http://search.naver.com/search.naver`;
    try {
      await delay(5000);
      const response = await request({
        uri: queryURL,
        qs: {
          where: 'news',
          query: searchKeyword,
          nso: 'so:r,p:1d,a:all',
          start: page,
        },
        headers: commonHeaders,
      });

      const $ = cheerio.load(response);

      for (const elem of $('.type01 a')) {
        const $elem = $(elem);
        if ($elem.text().indexOf('네이버뉴스') === 0) {
          newsData.push(await this.getNewsContent($elem.attr('href')));
        }
      }

    } catch (err) {
      console.error(err);
    }
    return newsData;
  }
}
