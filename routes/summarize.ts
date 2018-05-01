import * as Router from 'koa-router';
import { execAsync } from 'async-child-process';
import * as escape from 'shell-escape';
import * as RankCrawlNews from '../database/models/rank-crawl-news';

const router = new Router({ prefix: '/v1' });

router.post('/summarize/:keyword', async (ctx, next) => {

  const foundNews = await RankCrawlNews.model.findOne({
    where : {
      keyword : ctx.params.keyword,
      plain_text: {
        $ne: null,
      },
    },
    order: [['createdAt', 'DESC']],
  });
  if (foundNews) {
    console.log(foundNews);
    const patchContent: string = foundNews.dataValues.plain_text.trim().replace(/\\s+/g, ' ');
    const args = ['java', '-jar', 'utils/summarizer-java.jar', patchContent];
    ctx.body = JSON.parse((await execAsync(escape(args))).stdout.split('\n')[1]);
  } else {
    ctx.throw(404, 'Not found');
  }
});

export default router;
