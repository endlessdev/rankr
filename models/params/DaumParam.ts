import {ParserParam} from "../ParserParam";

export let paramDaum: ParserParam = {
    type: 'daum',
    url: 'http://www.daum.net',
    querySelector: 'ol.list_hotissue > li .rank_cont:not([aria-hidden])',
    parserSelector: function ($, elem) {
        var data = $(elem);
        return {
            title: data.find('.txt_issue > a').attr('title'),
            rank: '',
            status: data.find("em.rank_result .ir_wa").text(),
            value: data.find("em.rank_result").text().replace(/[^0-9]/g, "")
        }
    }
};