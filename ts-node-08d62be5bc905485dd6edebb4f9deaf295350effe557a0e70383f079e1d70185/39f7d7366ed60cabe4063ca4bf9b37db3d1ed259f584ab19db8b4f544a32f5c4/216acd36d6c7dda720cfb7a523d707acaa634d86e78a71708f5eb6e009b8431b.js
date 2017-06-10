"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require('dotenv');
dotenv.config();
exports.Sequelize = require('sequelize');
exports.sequelize = new exports.Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timestamps: false,
});
var connectWithRetry = function () {
    return exports.sequelize.authenticate()
        .then(function () {
        console.log('Connection has been established successfully.');
    })
        .catch(function (err) {
        console.log('Failed to connect to database on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
//# sourceMappingURL=/Users/endlessdev/Workspace/rankr-org/ts-node-08d62be5bc905485dd6edebb4f9deaf295350effe557a0e70383f079e1d70185/39f7d7366ed60cabe4063ca4bf9b37db3d1ed259f584ab19db8b4f544a32f5c4/216acd36d6c7dda720cfb7a523d707acaa634d86e78a71708f5eb6e009b8431b.js.map