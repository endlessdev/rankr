"use strict";

let cron = require('cron'),
    CronJob = cron.CronJob,
    mysql = require('mysql'),
    request = require('request');

var connectionPool = mysql.createPool({
    host: 'yeom.me',
    port: 3306,
    user: 'root',
    password: '',
    database: 'PortalRank',
    charset: "utf8_general_ci"
});

var job = new CronJob({
    cronTime: '* * * * *',
    timeZone: 'Asia/Seoul',
    onTick: function () {
        var rankTypes = ["naver", "daum"];
        rankTypes.forEach(function (rank) {
            request(`http://localhost:3000/rank/${rank}`, function (error, response, body) {
                var body = JSON.parse(body);
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