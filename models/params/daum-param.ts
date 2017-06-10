import { ParserParam } from '../parser-param';

const parserParam: ParserParam = {
  type: 'daum',
  url: 'http://www.daum.net',
  querySelector: 'ol.list_hotissue > li .rank_cont:not([aria-hidden])',
  parserSelector: ($, elem) => {
    const data = $(elem);
    return {
      title: data.find('.txt_issue > a').attr('title'),
      rank: '',
      status: data.find('em.rank_result .ir_wa').text(),
      value: data.find('em.rank_result').text().replace(/[^0-9]/g, ''),
    };
  },
};

export default parserParam;
