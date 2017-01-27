"use strict";

require('dotenv').config();

let cron = require('cron'),
    CronJob = cron.CronJob,
    mysql = require('mysql'),
    request = require('request');

var connectionPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: process.env.DB_CHARSET
});

var job = new CronJob({
    cronTime: '* * * * * *',
    timeZone: 'Asia/Seoul',
    onTick: function () {
        var rankTypes = ["naver", "daum", "nate"];
        rankTypes.forEach(function (rank) {
            request(`http://localhost:3000/rank/${rank}`, function (error, response, body) {
                let body = JSON.parse(body);
                if (!error && response.statusCode == 200) {
                    body.data.forEach(function (rankItem) {
                        var currentDate = new Date();
                        connectionPool.getConnection(function (err, connection) {
                            rankItem['created_at'] = currentDate;
                            rankItem['type'] = rank;
                            connection.query('insert into ranks_logs set ?', rankItem, function (err, result) {
                                if (err) {
                                    console.error(err);
                                    throw err;
                                } else {
                                    console.log('')
                                }
                                connection.release();
                            });
                        });
                    });
                }
            })
        });
    }
});
job.start();