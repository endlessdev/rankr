# PortalRank
Portal sites of realtime rank Node.js REST Application

#### Install
<pre>
$ npm install
</pre>

#### Run
<pre>
$ npm start
</pre>

## API Overview

**Naver realtime rank**

http://www.naver.com

 - ```GET``` /rank/naver 

**Daum realtime rank**

http://www.daum.net

 - ```GET``` /rank/daum
 
###Response JSON Example

```json
{
  "result": 1,
  "time": 1455988400,
  "data": [
    {
      "status": "상승",
      "title": "이상희",
      "rank": 1,
      "url": "http://search.naver.com/search.naver?where=nexearch&query=%EC%9D%B4%EC%83%81%ED%9D%AC&sm=top_lve&ie=utf8"
    },
  ]
}
```
##License
Follow **MIT LICENCE**

using Cheerio HTML parser of node module.
