import daumParam from '../models/params/daum-param';
import naverParam from '../models/params/naver-param';
import { sequelize, Sequelize } from './index';
import * as RankLogNaver from './models/rank-log-naver';
import * as RankLogZum from './models/rank-log-zum';
import * as RankLogNate from './models/rank-log-nate';
import * as RankLogDaum from './models/rank-log-daum';
import * as RankCrawlLog from './models/rank-crawl-log';
import * as RankCrawlNews from './models/rank-crawl-news';
import { paramZum } from '../models/params/zum-param';
import nateParser from '../utils/nate-parser';
import newsParser  from '../utils/news-parser';
import commonParser from '../utils/common-parser';

const CronJob = require('cron').CronJob;
const parserInstance = commonParser.Instance;

export const crawlJob = new CronJob({
  cronTime: '* * * * * *',
  timeZone: process.env.CRON_TIMEZONE,
  onTick: async () => {
    await sequelize.sync().then(() => {
      return RankCrawlLog.model.create({}).then(async (crawlLog) => {

        const plainCrawlLog = crawlLog.get({ plain: true });
        parserInstance.param = naverParam;

        const naverResult = await parserInstance.getRank();

        const rankHandler = (rank) => {
          newsParser.getNewsDataByKeyword(rank.title).then((newsData) => {
            for (const news of newsData) {
              RankCrawlNews.model.create({
                keyword : rank.title,
                rank_crawl_idx: plainCrawlLog.idx,
                url : news.link,
              });
            }
          }).catch((err) => {
            console.error(err);
          });
        };

        for (const rank of naverResult.data) {
          RankLogNaver.model.create({
            rank_crawl_idx: plainCrawlLog.idx,
            rank: rank.rank,
            title: rank.title,
          }).catch(Sequelize.ValidationError, (err) => {
            console.log(err);
          });
          rankHandler(rank);
        }

        parserInstance.param = daumParam;
        const daumResult = await parserInstance.getRank();
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
          rankHandler(rank);
        }
        parserInstance.param = paramZum;
        const zumResult = await parserInstance.getRank();
        for (const rank of zumResult.data) {
          RankLogZum.model.create({
            rank_crawl_idx: plainCrawlLog.idx,
            rank: rank.rank,
            title: rank.title,
          }).catch(Sequelize.ValidationError, (err) => {
            console.log(err);
          });
          rankHandler(rank);
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
          rankHandler(rank);
        }
      });
    });
  },
});
