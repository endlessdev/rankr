const read = require('node-readability');
const cheerio = require('cheerio');
const exec = require('child_process').exec;

read('https://ko.wikipedia.org/wiki/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD', function(err, article, meta) {
    if(!err){
        const content = article.content
            .replace(/<script[^>]*>[\s\S]*?<\/script>/igm, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/igm, '');

        const $ = cheerio.load(content);

        const parsedContent = ($("*").text())
            .replace(/\n|\r/g, ' ')
            .replace( /\s\s+/g, ' ')
            .trim();

            console.log(parsedContent);

        exec("python3 ./textrank.py '"+parsedContent+"'", function (error, stdout, stderr) {
            console.log(JSON.parse(stdout));
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

    } else {
        console.log(err);
    }
    article.close();
});