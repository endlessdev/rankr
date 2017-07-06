import { ParserParam } from '../parser-param';

const parserParam: ParserParam = {
  type: 'daum',
  url: 'http://www.daum.net',
  querySelector:
    '.hotissue_layer .list_hotissue.issue_row:not(.list_mini) > li .rank_cont[aria-hidden=true]',
  parserSelector: ($, elem) => {
    const data = $(elem);
    return {
      title: data.find('.txt_issue > a.link_issue:first-child').text(),
      rank: '',
      status: data.find('.rank_result .ico_pctop .ir_wa').text(),
      value: data.find('.rank_result').text().replace(/[^0-9]/g, ''),
    };
  },
};

export default parserParam;
