import * as requestPromise from 'request-promise';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import delay from '../utils/delay';
import commonHeaders from './common-headers';

export default class DaumParser{

  getNewsContentByURL = async (url: string) => {
    await delay(1000);
    const response = await requestPromise({
      uri: url,
      headers: commonHeaders,
      encoding: null,
    });

    let $ = cheerio.load(response);
    $('script').remove();
    const encodedResponse = iconv.decode(response, $('meta[charset]').attr('charset')).toString();
    $ = cheerio.load(encodedResponse);

    const newsTitle = $('meta[property=\'og:title\']').attr('content');
    const newsContent = $('.article_view:last-child, .news_view:last-child');

    return {
      title: newsTitle,
      content: newsContent.html(),
      plain_text: newsContent.text(),
      press: $('.info_cp .thumb_g, #pressLogo img').attr('alt'),
      link: url,
    };
  };


  getNewsList = async (searchKeyword: string, page: number) => {
    const newsData: any = [];
    const queryURL = `https://search.daum.net/search`;
    try {
      await delay(1000);
      const response = await requestPromise({
        uri: queryURL,
        qs: {
          w: 'news',
          enc: 'utf-8',
          q: searchKeyword,
          period: 'd',
          p: page,
        },
        headers: commonHeaders,
      });

      const $ = cheerio.load(response);

      for (const elem of $('.f_nb.date a')) {
        const $elem = $(elem);
        if ($elem.text().indexOf('다음뉴스') === 0) {
          newsData.push(await this.getNewsContentByURL($elem.attr('href')));
        }
      }

    } catch (err) {
      console.error(err);
    }
    return newsData;
  }
}
