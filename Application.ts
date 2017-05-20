/// <reference path="./typings/tsd.d.ts"/>

import * as http from "http";
import * as express from "express";
import * as path from "path";
import {Express, Request, Response} from "express";

import rank from './routes/rank';

const morgan = require("morgan"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser");

class Application {
    private app: Express;
    private httpServer: http.Server;

    constructor() {
        this.app = express();
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'hbs');

        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use('/rank', rank);

        this.app.use((req: Request, res: Response, next: Function) => {
            var err: any = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        if (this.app.get('env') === 'development') {
            this.app.use((err: any, req: Request, res: Response, next: Function)=> {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        this.app.use((err: any, req: Request, res: Response, next: Function)=> {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
        this.httpServer = http.createServer(this.app);
    }

    startServer(): void {
        //TODO Sequlize database syncing
        this.httpServer.listen(3000);
        //TODO handle onError, onListen
    }

    stopServer(): void {
        this.httpServer.close();
        process.exit(0);
    }
}

let application = new Application();
application.startServer();
require('./database/crawler').crawlStart();

process.on("SIGINT", ()=> {
    application.stopServer();
});