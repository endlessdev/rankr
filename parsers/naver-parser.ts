import * as request from 'request-promise';
import * as xml2js from 'xml2js';
import * as moment from 'moment';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import delay from '../utils/delay';

export default class NewsParser {

  static commonHeaders = {
    'upgrade-insecure-requests': 1,
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'Pragma': 'no-cache',
    'cookie': 'nx_open_so=1; nid_iplevel=1; nx_ssl=2;',
  };

  static getNewsContentByURL = async (url: string) => {
    await delay(5000);
    const response = await request({
      uri: url,
      headers: NewsParser.commonHeaders,
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
      link: url,
    };

  }

  static getNewsDataByKeywordByNaver = async (searchKeyword: string, page: number) => {
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
        headers: NewsParser.commonHeaders,
      });

      const $ = cheerio.load(response);

      for (const elem of $('.type01 a')) {
        const $elem = $(elem);
        if ($elem.text().indexOf('네이버뉴스') == 0) {
          newsData.push(await NewsParser.getNewsContentByURL($elem.attr('href')));
        }
      }

    } catch (err) {
      console.error(err);
    }
    return newsData;
  }


  static getNewsDataByKeyword = async (searchKeyword: string) => {
    let newsData: any = [];
    const rssURL = `http://newssearch.naver.com/search.naver?where=rss&query=`;
    const requestURL =
      `${rssURL}}${encodeURI(searchKeyword)}`;
    const rssResponse = await request(requestURL);
    await xml2js.parseString(rssResponse, async (err, result) => {
      newsData = result.rss.channel[0].item;
      await newsData.forEach(async (news, index) => {
        for (const element in newsData[index]) {
          if (newsData[index].hasOwnProperty(element)) {
            newsData[index][element] = newsData[index][element][0];
          }
        }
        if (news['media:thumbnail']) {
          newsData[index].thumb = news['media:thumbnail'].$.url.replace(/thumb140/gi, 'thumb');
          delete newsData[index]['media:thumbnail'];
        }
        newsData[index].pubDate = moment(newsData[index].pubDate).fromNow();
      });
    });
    return newsData;
  }
}
