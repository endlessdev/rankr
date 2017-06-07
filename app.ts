/// <reference path="./typings/tsd.d.ts"/>

import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as serve from 'koa-static'
import * as cors from 'koa-cors'

import * as path from 'path'

import rank from './routes/rank';
import news from './routes/news';
import api from './routes/analytics';
import {crawlJob} from './database/crawler'

const app = new Koa();
const port = process.env.PORT || 3000;
const dist = path.join(__dirname, '..', 'public');
const bpOption = {extendTypes: {json: ['application/x-javascript']}};

app
    .use(logger())
    .use(bodyParser(bpOption))
    .use(cors())
    .use(rank.routes())
    .use(api.routes())
    .use(news.routes())
    .use(serve(dist));

if (process.argv[2] == '--with-crawler'){
    crawlJob.start();
}
app.listen(port, () => console.log(`Listening on PORT ${port}`));
