/// <reference path="../typings/tsd.d.ts"/>

import * as Router from 'koa-router'
import * as request from 'request-promise'
import * as xml2js from 'xml2js'
import * as moment from 'moment'
import * as timezone from 'moment-timezone'

import async = Q.async;

const router = new Router({prefix: '/v1/news'});

timezone().tz("Asia/Seoul").format();

router.get('/:keyword', async (ctx, next) => {
    let rssResponse = await request(`http://newssearch.naver.com/search.naver?where=rss&query=${encodeURI(ctx.params.keyword)}`);
    await xml2js.parseString(rssResponse, async (err, result) => {
        let newsData = result.rss.channel[0].item;

        await newsData.forEach((news, index, arr) => {

            for (let element in newsData[index]) {
                if (newsData[index].hasOwnProperty(element)) {
                    newsData[index][element] = newsData[index][element][0];
                }
            }

            if (news['media:thumbnail']) {
                newsData[index].thumb = news['media:thumbnail'].$.url.replace(/thumb140/gi, 'thumb');
                delete newsData[index]['media:thumbnail'];
            }

            newsData[index].pubDate = timezone(newsData[index].pubDate).fromNow();

        });
        ctx.body = newsData;
    });
});

export default router;