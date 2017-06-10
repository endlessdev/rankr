"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var CommonParser_1 = require("../utils/CommonParser");
var NateParser_1 = require("../utils/NateParser");
var DaumParam_1 = require("../models/params/DaumParam");
var NaverParam_1 = require("../models/params/NaverParam");
var index_1 = require("../database/index");
var RankLogNaver = require("../database/models/RankLogNaver");
var RankLogZum = require("../database/models/RankLogZum");
var RankLogNate = require("../database/models/RankLogNate");
var RankLogDaum = require("../database/models/RankLogDaum");
var RankCrawlLog = require("../database/models/RankCrawlLog");
var ZumParam_1 = require("../models/params/ZumParam");
var CronJob = require('cron').CronJob, commonParser = new CommonParser_1.default();
exports.crawlJob = new CronJob({
    cronTime: '* * * * *',
    timeZone: process.env.CRON_TIMEZONE,
    onTick: function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, index_1.sequelize.sync().then(function () {
                        var _this = this;
                        return RankCrawlLog.model.create({}).then(function (crawlLog) { return __awaiter(_this, void 0, void 0, function () {
                            var naverResult, _i, _a, rank, daumResult, _b, _c, rank, zumResult, _d, _e, rank, nateResult, _f, _g, rank;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        crawlLog = crawlLog.get({ plain: true });
                                        commonParser.setParam(NaverParam_1.default);
                                        return [4, commonParser.getRank()];
                                    case 1:
                                        naverResult = _h.sent();
                                        for (_i = 0, _a = naverResult.data; _i < _a.length; _i++) {
                                            rank = _a[_i];
                                            RankLogNaver.model.create({
                                                rank_crawl_idx: crawlLog.idx,
                                                rank: rank.rank,
                                                title: rank.title,
                                            }).catch(index_1.Sequelize.ValidationError, function (err) {
                                                console.log(err);
                                            });
                                        }
                                        commonParser.setParam(DaumParam_1.default);
                                        return [4, commonParser.getRank()];
                                    case 2:
                                        daumResult = _h.sent();
                                        for (_b = 0, _c = daumResult.data; _b < _c.length; _b++) {
                                            rank = _c[_b];
                                            RankLogDaum.model.create({
                                                rank_crawl_idx: crawlLog.idx,
                                                rank: rank.rank,
                                                title: rank.title,
                                                status: rank.status,
                                                value: rank.value
                                            }).catch(index_1.Sequelize.ValidationError, function (err) {
                                                console.log(err);
                                            });
                                        }
                                        commonParser.setParam(ZumParam_1.paramZum);
                                        return [4, commonParser.getRank()];
                                    case 3:
                                        zumResult = _h.sent();
                                        for (_d = 0, _e = zumResult.data; _d < _e.length; _d++) {
                                            rank = _e[_d];
                                            RankLogZum.model.create({
                                                rank_crawl_idx: crawlLog.idx,
                                                rank: rank.rank,
                                                title: rank.title,
                                            }).catch(index_1.Sequelize.ValidationError, function (err) {
                                                console.log(err);
                                            });
                                        }
                                        return [4, NateParser_1.default.getNateRank()];
                                    case 4:
                                        nateResult = _h.sent();
                                        for (_f = 0, _g = nateResult.data; _f < _g.length; _f++) {
                                            rank = _g[_f];
                                            RankLogNate.model.create({
                                                rank_crawl_idx: crawlLog.idx,
                                                rank: rank.rank,
                                                title: rank.title,
                                                status: rank.status,
                                                value: rank.value
                                            }).catch(index_1.Sequelize.ValidationError, function (err) {
                                                console.log(err);
                                            });
                                        }
                                        return [2];
                                }
                            });
                        }); });
                    })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); }
});
//# sourceMappingURL=/Users/endlessdev/Workspace/rankr-org/ts-node-08d62be5bc905485dd6edebb4f9deaf295350effe557a0e70383f079e1d70185/39f7d7366ed60cabe4063ca4bf9b37db3d1ed259f584ab19db8b4f544a32f5c4/1ca9565f5145b26e5446d7db8c483c34d23f010e9f926ccb2fa2f6663fdd278f.js.map