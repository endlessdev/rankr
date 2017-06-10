"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var logger = require("koa-logger");
var serve = require("koa-static");
var cors = require("koa-cors");
var path = require("path");
var rank_1 = require("./routes/rank");
var news_1 = require("./routes/news");
var analytics_1 = require("./routes/analytics");
var crawler_1 = require("./database/crawler");
var app = new Koa();
var port = process.env.PORT || 3000;
var dist = path.join(__dirname, '..', 'public');
var bpOption = { extendTypes: { json: ['application/x-javascript'] } };
app
    .use(logger())
    .use(bodyParser(bpOption))
    .use(cors())
    .use(rank_1.default.routes())
    .use(analytics_1.default.routes())
    .use(news_1.default.routes())
    .use(serve(dist));
if (process.argv[2] === '--with-crawler')
    crawler_1.crawlJob.start();
app.listen(port, function () { return console.log("Listening on PORT " + port); });
//# sourceMappingURL=app.js.map