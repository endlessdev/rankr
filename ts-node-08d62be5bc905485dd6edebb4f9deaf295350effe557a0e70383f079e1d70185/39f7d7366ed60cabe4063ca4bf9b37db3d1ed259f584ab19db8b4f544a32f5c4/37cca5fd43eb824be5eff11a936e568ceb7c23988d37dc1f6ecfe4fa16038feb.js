"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeFormattedStatus = function (status) {
    if (!status)
        return null;
    if (status.indexOf("상승") != -1 || status.indexOf("+") != -1) {
        return "up";
    }
    else if (status.indexOf("하락") != -1 || status.indexOf("-") != -1) {
        return "down";
    }
    else {
        return "new";
    }
};
//# sourceMappingURL=/Users/endlessdev/Workspace/rankr-org/ts-node-08d62be5bc905485dd6edebb4f9deaf295350effe557a0e70383f079e1d70185/39f7d7366ed60cabe4063ca4bf9b37db3d1ed259f584ab19db8b4f544a32f5c4/37cca5fd43eb824be5eff11a936e568ceb7c23988d37dc1f6ecfe4fa16038feb.js.map