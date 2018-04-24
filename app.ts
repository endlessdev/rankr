/// <reference path="./typings/tsd.d.ts"/>

import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as koaLogger from 'koa-logger';
import logger from './utils/logger';
import * as serve from 'koa-static';
import * as cors from 'koa2-cors';

import * as path from 'path';

import rank from './routes/rank';
import news from './routes/news';
import analytics from './routes/analytics';
import summarize from './routes/summarize';
import { crawlJob } from './database/crawler';

const app = new Koa();
const port = process.env.PORT || 3000;
const dist = path.join(__dirname, '..', 'public');
const bpOption = { extendTypes: { json: ['application/x-javascript'] } };

app
  .use(koaLogger())
  .use(bodyParser(bpOption))
  .use(cors())
  .use(rank.routes())
  .use(analytics.routes())
  .use(news.routes())
  .use(summarize.routes())
  .use(serve(dist));

if (process.argv[2] === '--with-crawler') {
  crawlJob.start();
}
app.listen(port, () => logger.info(`Listening on PORT ${port}`));
