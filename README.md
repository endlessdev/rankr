<p align="center">
    <img width="300" src='http://svgshare.com/i/1Tv.svg'/><br>
    <span>REST Application of portal sites realtime rank API </span><br><br>
    <a><img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square"></a>
    <a href="https://travis-ci.org/endlessdev/rankr"><img src="https://img.shields.io/travis/endlessdev/rankr.svg?branch=master&style=flat-square"></a>
</p>

## Get started

**Install Dependencies**
<pre>
$ npm install
</pre>

**Run Migrations** (Optional - For crawler)

using sequelize-cli
<pre>
$ sequelize db:migrate --env [database env]
</pre>

**Running Application**

Make transcompiling, cleaning, serve by setted gulpfile of gulp
<pre>
$ gulp
</pre>

## API Overview

**Naver realtime rank**

 - ```GET``` /rank/naver 

**Daum realtime rank**

 - ```GET``` /rank/daum

**Nate realtime rank**

 - ```GET``` /rank/nate
 
### Response JSON Example

```json
{
  "resultCode": 200,
  "rankType": "daum",
  "requestDate": "2017-04-30T12:37:15.554Z",
  "data": [
    {
      "rank": 1,
      "value": "481",
      "title": "신동엽",
      "status": "up"
    },
    ...
  ]
}
```

## Crawler

Crawler stores Rank data in the database every time it runs.

### Database

Using Sequelize for ORM

### Running
It automatically run when started Application

## Milestone

 - [ ] Google Trend Parsing
 - [ ] Visuallizer web page
 - [ ] Parse and crawl news contents
 - [ ] Do stuff with Neural network (Please suggest to me)

## License

Follow the  **MIT LICENCE**

