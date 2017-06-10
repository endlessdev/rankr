"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database = require('../index'), sequelize = database.sequelize, Sequelize = database.Sequelize;
exports.model = sequelize.define('rank_daum_logs', {
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
    },
    status: {
        type: Sequelize.ENUM('up', 'down', 'new')
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
});
//# sourceMappingURL=/Users/endlessdev/Workspace/rankr-org/ts-node-08d62be5bc905485dd6edebb4f9deaf295350effe557a0e70383f079e1d70185/39f7d7366ed60cabe4063ca4bf9b37db3d1ed259f584ab19db8b4f544a32f5c4/dca1930bd1f1e9d41de5f91906764c752c4fa50be82c9997aff5a97e8579dea0.js.map