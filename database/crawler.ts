import CommonParser from "../utils/CommonParser"
import NateParser from "../utils/NateParser"
import paramDaum from "../models/params/DaumParam"
import paramNaver from "../models/params/NaverParam"
import {sequelize, Sequelize} from "../database/index";
import * as RankLogNaver from "../database/models/RankLogNaver"
import * as RankLogNate from "../database/models/RankLogNate"
import * as RankLogDaum from "../database/models/RankLogDaum"
import * as RankCrawlLog from "../database/models/RankCrawlLog"

const CronJob = require('cron').CronJob,
    naverParser: CommonParser = new CommonParser(),
    daumParser: CommonParser = new CommonParser();

let crawlJob = new CronJob({
    cronTime: '* * * * *',
    timeZone: process.env.CRON_TIMEZONE,
    onTick: async () => {
        await sequelize.sync().then(function () {
            return RankCrawlLog.model.create({}).then(async (crawlLog) => {
                crawlLog = crawlLog.get({plain: true});
                naverParser.setParam(paramNaver);
                const naverResult = await naverParser.getRank();
                for (let rank of naverResult.data) {
                    RankLogNaver.model.create({
                        rank_crawl_idx: crawlLog.idx,
                        rank: rank.rank,
                        title: rank.title,
                    }).catch(Sequelize.ValidationError, (err) => {
                        console.log(err);
                    });
                }
                daumParser.setParam(paramDaum);
                const daumResult = await daumParser.getRank();
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

export default {
    crawlJob: crawlJob
};