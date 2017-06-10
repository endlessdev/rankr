"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramZum = {
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
//# sourceMappingURL=/Users/endlessdev/Workspace/rankr-org/ts-node-08d62be5bc905485dd6edebb4f9deaf295350effe557a0e70383f079e1d70185/39f7d7366ed60cabe4063ca4bf9b37db3d1ed259f584ab19db8b4f544a32f5c4/d7b2024ce92793b47de1be1afe9c2d4405cc3b9edb6e4442006e799dccfd0163.js.map