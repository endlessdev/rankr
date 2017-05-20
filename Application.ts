/// <reference path="./typings/tsd.d.ts"/>

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import serve from 'koa-static'

import rank from './routes/rank';
import crawler from './database/crawler'

const app = new Koa()
const port = process.env.PORT || 3000
const dist = path.join(__dirname, '..', 'public')
const bpOption = {extendTypes: {json: ['application/x-javascript']}}

app
  .use(logger())
  .use(bodyParser(bpOption))
  .use(routes())
  .use(serve(dist))
  
 crawler.crawlStart();
 app.listen(port, () => console.log(`Listening on PORT ${port}`))
