import commonParser from '../utils/common-parser';
import nateParser from '../utils/nate-parser';
import daumParam from '../models/params/daum-param';
import naverParam from '../models/params/naver-param';
import { sequelize, Sequelize } from '../database/index';
import * as RankLogNaver from './models/rank-log-naver';
import * as RankLogZum from './models/rank-log-zum';
import * as RankLogNate from './models/rank-log-nate';
import * as RankLogDaum from './models/rank-log-daum';
import * as RankCrawlLog from './models/rank-crawl-log';
import { paramZum } from '../models/params/zum-param';

const CronJob = require('cron').CronJob;

export const crawlJob = new CronJob({
  cronTime: '* * * * *',
  timeZone: process.env.CRON_TIMEZONE,
  onTick: async () => {
    const commonParser: commonParser = new commonParser();
    await sequelize.sync().then(() => {
      return RankCrawlLog.model.create({}).then(async (crawlLog) => {
        const plainCrawlLog = crawlLog.get({ plain: true });
        commonParser.setParam(naverParam);
        const naverResult = await commonParser.getRank();
        for (const rank of naverResult.data) {
          RankLogNaver.model.create({
            rank_crawl_idx: plainCrawlLog.idx,
            rank: rank.rank,
            title: rank.title,
          }).catch(Sequelize.ValidationError, (err) => {
            console.log(err);
          });
        }
        commonParser.setParam(daumParam);
        const daumResult = await commonParser.getRank();
        for (const rank of daumResult.data) {
          RankLogDaum.model.create({
            rank_crawl_idx: plainCrawlLog.idx,
            rank: rank.rank,
            title: rank.title,
            status: rank.status,
            value: rank.value,
          }).catch(Sequelize.ValidationError, (err) => {
            console.log(err);
          });
        }
        commonParser.setParam(paramZum);
        const zumResult = await commonParser.getRank();
        for (const rank of zumResult.data) {
          RankLogZum.model.create({
            rank_crawl_idx: plainCrawlLog.idx,
            rank: rank.rank,
            title: rank.title,
          }).catch(Sequelize.ValidationError, (err) => {
            console.log(err);
          });
        }
        const nateResult = await nateParser.getNateRank();
        for (const rank of nateResult.data) {
          RankLogNate.model.create({
            rank_crawl_idx: plainCrawlLog.idx,
            rank: rank.rank,
            title: rank.title,
            status: rank.status,
            value: rank.value,
          }).catch(Sequelize.ValidationError, (err) => {
            console.log(err);
          });
        }
      });
    });
  },
});
