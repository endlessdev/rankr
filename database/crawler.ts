import daumParam from '../models/params/daum-param';
import naverParam from '../models/params/naver-param';
import { sequelize, Sequelize } from './index';
import * as RankLogNaver from './models/rank-log-naver';
import * as RankLogZum from './models/rank-log-zum';
import * as RankLogNate from './models/rank-log-nate';
import * as RankLogDaum from './models/rank-log-daum';
import * as RankCrawlLog from './models/rank-crawl-log';
import * as RankCrawlNews from './models/rank-crawl-news';
import {paramZum} from '../models/params/zum-param';
import nateParser from '../utils/nate-parser';
import naverParser from '../parsers/naver-parser';
import commonParser from '../utils/common-parser';
import DaumParser from '../parsers/daum-parser';


const CronJob = require('cron').CronJob;
const parserInstance = commonParser.Instance;

const daumParser = new DaumParser();

export const crawlJob = new CronJob({
  cronTime: '0,30 * * * * *',
  timeZone: process.env.CRON_TIMEZONE,
  onTick: async () => {
    await sequelize.sync().then(() => {
      return RankCrawlLog.model.create({}).then(async (crawlLog) => {

        const plainCrawlLog = crawlLog.get({plain: true});
        parserInstance.param = naverParam;

        const naverResult = await parserInstance.getRank();

        const rankHandler = async (rank) => {
          for (let i = 1; i < 5; i++) {
            const newsList = await daumParser.getNewsList(rank.title, i == 1 ? 1 : i * 10 + 1);
            for (const news of newsList) {
              RankCrawlNews.model.count({
                where: {
                  url: news.link,
                },
              }).then((count) => {
                if (count === 0) {
                  RankCrawlNews.model.create({
                    keyword: rank.title,
                    rank_crawl_idx: plainCrawlLog.idx,
                    url: news.link,
                    title: news.title,
                    content: news.content,
                    plain_text: news.plain_text,
                    press: news.press,
                  }).catch(() => {
                    // console.log(`Already exist in database - ${news.link}`);
                  });
                }
              });
            }
          }
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
