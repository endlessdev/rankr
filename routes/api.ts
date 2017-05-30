/// <reference path="../typings/tsd.d.ts"/>

import * as Router from 'koa-router'
import {sequelize, Sequelize} from "../database/index"

import async = Q.async;

const router = new Router({prefix: '/analytics'});

/* GET home page. */

router.get('/recent', async (ctx, next) => {

    const RAW_QUERY = `
   SELECT title,
        Avg(rank)    AS rank_avg,
        Count(title) AS count
    FROM   rank_naver_logs
    UNION
    SELECT title,
        Avg(rank)    AS rank_avg,
        Count(title) AS count
    FROM   rank_daum_logs
    UNION
    SELECT title,
        Avg(rank)    AS rank_avg,
        Count(title) AS count
    FROM   rank_zum_logs
    WHERE  ( rank_crawl_idx IN (SELECT idx           
    FROM   rank_crawl_logs
    WHERE  createdAt >= Now() - INTERVAL 1 hour) )
    GROUP  BY title
    ORDER  BY rank_avg ASC
    LIMIT
    10`;

    let result = [];
    await sequelize.query(RAW_QUERY).spread(async (results, metadata) => {
        result = results;
    });

    ctx.body = result;

});

router.get('/today', async (ctx, next) => {

    const RAW_QUERY = `
   SELECT
  title,
  Avg(rank)    AS rank_avg,
  Count(title) AS count,
  rank_crawl_logs.*
FROM rank_naver_logs
  LEFT JOIN rank_crawl_logs ON rank_crawl_idx = rank_crawl_logs.idx
  WHERE ((rank_crawl_idx IN (SELECT idx
                           FROM rank_crawl_logs
                           WHERE createdAt >= Now() - INTERVAL 1 DAY))) AND
      (createdAt >= Now() - INTERVAL 1 DAY)
UNION
SELECT
  title,
  Avg(rank)    AS rank_avg,
  Count(title) AS count,
  rank_crawl_logs.*
FROM rank_daum_logs
  LEFT JOIN rank_crawl_logs ON rank_crawl_idx = rank_crawl_logs.idx
  WHERE ((rank_crawl_idx IN (SELECT idx
                           FROM rank_crawl_logs
                           WHERE createdAt >= Now() - INTERVAL 1 DAY))) AND
      (createdAt >= Now() - INTERVAL 1 DAY)
UNION
SELECT
  title,
  Avg(rank)    AS rank_avg,
  Count(title) AS count,
  rank_crawl_logs.*
FROM rank_zum_logs
  LEFT JOIN rank_crawl_logs ON rank_crawl_idx = rank_crawl_logs.idx

WHERE ((rank_crawl_idx IN (SELECT idx
                           FROM rank_crawl_logs
                           WHERE createdAt >= Now() - INTERVAL 1 DAY))) AND
      (createdAt >= Now() - INTERVAL 1 DAY)
GROUP BY title
ORDER BY createdAt DESC,
  count DESC`;

    let result = [];
    await sequelize.query(RAW_QUERY).spread(async (results, metadata) => {
        result = results;
    });

    ctx.body = result;

});


export default router;
