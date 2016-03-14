# PortalRank
한국 포털사이트의 실시간 급상승 인기검색어의 비공식 REST API입니다.

Node.js 애플리케이션으로 개발되었습니다.

#### Install Dependency
<pre>
$ npm install
</pre>

#### Running Application
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

**Nate realtime rank**

http://www.nate.com

 - ```GET``` /rank/nate
 
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

##Milestone

 - [ ] Nate Parsing
 - [ ] Google Trend Parsing

##License
Follow **MIT LICENCE**

using Cheerio HTML parser of node module.
