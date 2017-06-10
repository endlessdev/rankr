"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parserParam = {
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
        };
    }
};
exports.default = parserParam;
//# sourceMappingURL=/Users/endlessdev/Workspace/rankr-org/ts-node-08d62be5bc905485dd6edebb4f9deaf295350effe557a0e70383f079e1d70185/39f7d7366ed60cabe4063ca4bf9b37db3d1ed259f584ab19db8b4f544a32f5c4/96d6f9881738cd6a3848d905e543ce90bfdb7522f1fa8229ea6b66b14788ad6a.js.map