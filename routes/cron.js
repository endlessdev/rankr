"use strict";

let cron = require('cron');
let CronJob = cron.CronJob;
let mysql = require('mysql');
let request = require('request');

var DB = mysql.DB;

var DBConnection = new DB({
    host: 'yeom.me',
    user: 'root',
    password: '',
    database: 'PortalRank'
});

var job = new CronJob({
    cronTime: '* * * * * *',
    onTick: function () {
        request('http://localhost:3000/rank/naver', function (error, response, body) {
            var body = JSON.parse(body);
            if (!error && response.statusCode == 200) {
                for (var item of body.data) {
                    var query = DBConnection.query('insert into ranks_logs set ?',item,function(err,result){
                        if (err) {
                            console.error(err);
                            throw err;
                        } else {
                            console.log('asdf');
                        }
                    });
                }
            }
        })
    },
    timeZone: 'Asia/Seoul'
});
job.start();