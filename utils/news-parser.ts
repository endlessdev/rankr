import * as request from 'request-promise';
import * as xml2js from 'xml2js';
import * as moment from 'moment';
import * as cheerio from 'cheerio'
import * as iconv from 'iconv-lite';

export default class NewsParser {

  static getNewsContentByURL = async (url : string) => {
    let response = await request({
      uri : url,
      headers : {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
        'cookie': 'nx_ssl=2;'
      }
      ,encoding: null
    });

    const encodedResponse = iconv.decode(response, 'EUC-KR').toString();
    let $ = cheerio.load(encodedResponse);

    let newsTitle = $("meta[property='og:title']").attr('content');
    let newsContent = $('#articeBody, #newsEndContent, #articleBodyContents').html();

    return {
      title : newsTitle,
      content : newsContent,
      press : $(".press_logo img, #pressLogo img").attr('alt'),
      link: url
    }

  }

  static getNewsDataByKeywordByNaver = async (searchKeyword: string, page : number) => {
    let newsData: any = [];
    const queryURL = `https://search.naver.com/search.naver`;

    try {

      let response = await request({
        uri : queryURL,
        qs : {
          where : 'news',
          query : searchKeyword,
          nso : 'so:r,p:1d,a:all',
          start: page
        },
        headers : {
          'cookie': 'nx_ssl=2;',
          'upgrade-insecure-requests': 1,
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
        }
      });

      const $ = cheerio.load(response);
      
      for (let elem of $(".type01 a")) {
        let $elem = $(elem);
        if ($elem.text().indexOf("네이버뉴스") == 0){
          newsData.push(await NewsParser.getNewsContentByURL($elem.attr('href')))
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
