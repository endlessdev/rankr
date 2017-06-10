"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database = require('../index'), sequelize = database.sequelize, Sequelize = database.Sequelize;
exports.model = sequelize.define('rank_zum_logs', {
    idx: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rank_crawl_idx: {
        type: Sequelize.INTEGER,
        references: {
            model: "rank_crawl_logs",
            key: "idx"
        },
        onDelete: "CASCADE"
    },
    title: {
        type: Sequelize.STRING
    },
    rank: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
});
//# sourceMappingURL=/Users/endlessdev/Workspace/rankr-org/ts-node-08d62be5bc905485dd6edebb4f9deaf295350effe557a0e70383f079e1d70185/39f7d7366ed60cabe4063ca4bf9b37db3d1ed259f584ab19db8b4f544a32f5c4/245f24aece9e0e992245865f02e644f2362ec87b1cf5d8a5f32d90010c11587f.js.map