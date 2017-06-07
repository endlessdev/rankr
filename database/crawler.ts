import CommonParser from "../utils/common-parser"
import NateParser from "../utils/nate-parser"
import paramDaum from "../models/params/daum-param"
import paramNaver from "../models/params/naver-param"
import {sequelize, Sequelize} from "../database/index";
import * as RankLogNaver from "./models/rank-log-naver"
import * as RankLogZum from "./models/rank-log-zum"
import * as RankLogNate from "./models/rank-log-nate"
import * as RankLogDaum from "./models/rank-log-daum"
import * as RankCrawlLog from "./models/rank-crawl-log"
import {paramZum} from "../models/params/zum-param";

const CronJob = require('cron').CronJob,
    commonParser: CommonParser = new CommonParser();

export const crawlJob = new CronJob({
    cronTime: '* * * * *',
    timeZone: process.env.CRON_TIMEZONE,
    onTick: async () => {
        await sequelize.sync().then(function () {
            return RankCrawlLog.model.create({}).then(async (crawlLog) => {
                crawlLog = crawlLog.get({plain: true});
                commonParser.setParam(paramNaver);
                const naverResult = await commonParser.getRank();
                for (let rank of naverResult.data) {
                    RankLogNaver.model.create({
                        rank_crawl_idx: crawlLog.idx,
                        rank: rank.rank,
                        title: rank.title,
                    }).catch(Sequelize.ValidationError, (err) => {
                        console.log(err);
                    });
                }
                commonParser.setParam(paramDaum);
                const daumResult = await commonParser.getRank();
                for (let rank of daumResult.data) {
                    RankLogDaum.model.create({
                        rank_crawl_idx: crawlLog.idx,
                        rank: rank.rank,
                        title: rank.title,
                        status: rank.status,
                        value: rank.value
                    }).catch(Sequelize.ValidationError, err => {
                        console.log(err);
                    });
                }
                commonParser.setParam(paramZum);
                const zumResult = await commonParser.getRank();
                for (let rank of zumResult.data) {
                    RankLogZum.model.create({
                        rank_crawl_idx: crawlLog.idx,
                        rank: rank.rank,
                        title: rank.title,
                    }).catch(Sequelize.ValidationError, (err) => {
                        console.log(err);
                    });
                }
                const nateResult = await NateParser.getNateRank();
                for (let rank of nateResult.data) {
                    RankLogNate.model.create({
                        rank_crawl_idx: crawlLog.idx,
                        rank: rank.rank,
                        title: rank.title,
                        status: rank.status,
                        value: rank.value
                    }).catch(Sequelize.ValidationError, err => {
                        console.log(err);
                    });
                }
            })
        })
    }
});