"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
exports.model = index_1.sequelize.define('rank_crawl_logs', {
    idx: {
        type: index_1.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: {
        type: index_1.Sequelize.DATE,
        defaultValue: index_1.Sequelize.NOW
    }
}, {
    timestamps: false,
});
//# sourceMappingURL=/Users/endlessdev/Workspace/rankr-org/ts-node-08d62be5bc905485dd6edebb4f9deaf295350effe557a0e70383f079e1d70185/39f7d7366ed60cabe4063ca4bf9b37db3d1ed259f584ab19db8b4f544a32f5c4/e7454c13ddbab021ff17c986c7eeb1cc984fc4631781386cb05106256308f90f.js.map