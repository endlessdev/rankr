import {CommonParser} from "../utils/CommonParser";
import {NateParser} from "../utils/NateParser";
import {paramDaum} from "../models/params/DaumParam";
import {paramNaver} from "../models/params/NaverParam";
import * as RankLogNaver from "../database/models/RankLogNaver"
import * as RankLogNate from "../database/models/RankLogNate"
import * as RankLogDaum from "../database/models/RankLogDaum"
import * as RankCrawlLog from "../database/models/RankCrawlLog"

const database = require('./index'),
    sequelize = database.sequelize,
    Sequelize = database.Sequelize,
    CronJob = require('cron').CronJob,
    naverParser:CommonParser = new CommonParser(),
    daumParser:CommonParser = new CommonParser();


let crawlJob = new CronJob({
    cronTime: '* * * * *',
    timeZone: process.env.CRON_TIMEZONE,
    onTick: () => {
        sequelize.sync().then(function () {
            return RankCrawlLog.model.create({}).then((crawlLog) => {
                crawlLog = crawlLog.get({plain: true});
                naverParser.setParam(paramNaver);
                naverParser.getRank(function (rankResult) {
                    for (let rank of rankResult.data) {
                        RankLogNaver.model.create({
                            rank_crawl_idx: crawlLog.idx,
                            rank: rank.rank,
                            title: rank.title,
                        }).catch(Sequelize.ValidationError, (err) => {
                            console.log(err);
                        });
                    }
                });
                daumParser.setParam(paramDaum);
                daumParser.getRank(function (rankResult) {
                    for (let rank of rankResult.data) {
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
                });
                NateParser.getNateRank(rankResult => {
                    for (let rank of rankResult.data) {
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
            });
        })
    }
});

exports.crawlStart = ()=> {
    crawlJob.start();
};