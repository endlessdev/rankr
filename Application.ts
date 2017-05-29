/// <reference path="./typings/tsd.d.ts"/>

import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as serve from 'koa-static'
import * as cors from 'koa-cors'

import * as path from 'path'

import rank from './routes/rank';
import api from './routes/api';
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
    .use(serve(dist));

crawlJob.start();
app.listen(port, () => console.log(`Listening on PORT ${port}`));
