import { ParserParam } from '../parser-param';

const parserParam: ParserParam = {
  type: 'naver',
  url: 'http://www.naver.com',
  querySelector: 'ul.ah_l:first-child li.ah_item > a',
  parserSelector: ($, elem) => {
    const data = $(elem);
    return {
      title: data.find('.ah_k').text(),
      rank: data.find('.ah_r').text(),
    };
  },
};

export default parserParam;
