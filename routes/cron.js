"use strict";

require('dotenv').config();

let cron = require('cron'),
    CronJob = cron.CronJob,
    mysql = require('mysql'),
    request = require('request');

let connectionPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: process.env.DB_CHARSET
});

let connectWithRetry = function () {
    return connectionPool.connect(function (err) {
        if (err) {
            console.error('Failed to connect to mysql on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('Success connecting to mysql')
        }
    });
};

let insertQuery = 'INSERT INTO ranks_logs SET ?';

let crawlRank = () => {
    let rankTypes = ["naver", "daum", "nate"];
    rankTypes.forEach(function (rank) {
            let requestURL = `http://localhost:3000/rank/${rank}`;
            request(requestURL, (error, response, body) => {
                let parsedBody = JSON.parse(body);
                if (!error && response.statusCode == 200) {
                    parsedBody.data.forEach(rankItem => {
                        let currentDate = new Date();
                        connectionPool.getConnection((err, connection) => {
                            rankItem['created_at'] = currentDate;
                            rankItem['type'] = rank;
                            connection.query(insertQuery, rankItem, err => {
                                if (err) {
                                    console.error(err);
                                    throw err;
                                } else {
                                    console.log(new Date() + '크롤링 한 데이터가 성공적으로 데이터베이스에 삽입되었습니다.');
                                    connection.release();
                                }
                            });
                        });
                    });
                } else {
                    console.log('비정상적인 리스폰스 입니다.');
                }
            });
        }
    );
};

let crawlWhenTick = function () {
    crawlRank();
};

let jobParams = {
    cronTime: '* * * * *',
    timeZone: process.env.CRON_TIMEZONE,
    onTick: crawlWhenTick
};

let crawlingJob = new CronJob(jobParams);
crawlingJob.start();