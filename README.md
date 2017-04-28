# PortalRank
The popular potal sites realtime popularity search word ranking of south korea RESTful API

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
 - [ ] Web Font-end page

##Thanks to
### **Cheerio**
 
For HTML parsing to use [cheerio HTML parser](https://github.com/cheeriojs/cheerio) of 3rd party node module.

 
### **Request**

For receive Request response [Request - Simplified HTTP client](https://github.com/request/request) 3rd party of node module

## **License**

Under the  **MIT LICENCE**

