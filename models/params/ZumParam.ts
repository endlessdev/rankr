import {ParserParam} from "../ParserParam";

export let paramZum: ParserParam = {
    type: "zum",
    url: 'http://zum.com/',
    querySelector: '.d_rank .d_btn_keyword.d_ready',
    parserSelector: function ($, elem) {
        var data = $(elem);
        return {
            title: data.attr("title"),
            rank: data.data("order")
        };
    }
};
