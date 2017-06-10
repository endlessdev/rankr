"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parserParam = {
    type: "naver",
    url: 'http://www.naver.com',
    querySelector: 'ul.ah_l:first-child li.ah_item > a',
    parserSelector: function ($, elem) {
        var data = $(elem);
        return {
            title: data.find('.ah_k').text(),
            rank: data.find('.ah_r').text(),
        };
    }
};
exports.default = parserParam;
//# sourceMappingURL=/Users/endlessdev/Workspace/rankr-org/ts-node-08d62be5bc905485dd6edebb4f9deaf295350effe557a0e70383f079e1d70185/39f7d7366ed60cabe4063ca4bf9b37db3d1ed259f584ab19db8b4f544a32f5c4/c887ce7d419a53e60edd788412675bb6bdfb0eabc5618bfd97ddb466ac3b4409.js.map