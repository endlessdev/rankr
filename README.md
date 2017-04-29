<p align="center">
    <img width="300" src='http://svgshare.com/i/1Tv.svg'/><br>
    <a><img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square"></a>
</p>

## Get started

#### Install Dependencies
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
 
### Response JSON Example

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

## Milestone

 - [ ] Google Trend Parsing
 - [ ] Web Font-end page

## License

Follow the  **MIT LICENCE**

