"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var logger = require("koa-logger");
var serve = require("koa-static");
var path = require("path");
var rank_1 = require("./routes/rank");
var crawler_1 = require("./database/crawler");
var app = new Koa();
var port = process.env.PORT || 3000;
var dist = path.join(__dirname, '..', 'public');
var bpOption = { extendTypes: { json: ['application/x-javascript'] } };
app
    .use(logger())
    .use(bodyParser(bpOption))
    .use(rank_1.default.routes())
    .use(serve(dist));
crawler_1.crawlJob.start();
app.listen(port, function () { return console.log("Listening on PORT " + port); });
//# sourceMappingURL=/Users/endlessdev/Workspace/rankr-org/ts-node-08d62be5bc905485dd6edebb4f9deaf295350effe557a0e70383f079e1d70185/39f7d7366ed60cabe4063ca4bf9b37db3d1ed259f584ab19db8b4f544a32f5c4/ad1ff39563baf49ed0691727e7af2572b93294f387731fc6ccd9e815be97f4ab.js.map