<p align="center">
    <img width="350" src='https://cdn.rawgit.com/endlessdev/rankr/master/rankr.svg'/><br>
    <b><p>대한민국 포털사이트 검색어 기반<br>실시간 통합정보분석 서비스</p></b><br><br>
    <a><img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square"></a>
    <a href="https://travis-ci.org/endlessdev/rankr"><img src="https://img.shields.io/travis/endlessdev/rankr.svg?branch=master&style=flat-square"></a>
</p>

## 시작하기

### 의존성 설치

본 서비스를 실행하기 위해선 의존성 외부 모듈들을 설치해야만 합니다.<br>
아래의 명령어를 통해 의존성 모듈을 설치해주세요.
<pre>
$ npm install
</pre>

### 마이그레이션 실행

> 크롤링을 사용하지 않으려면, 이 사항을 건너뛰어도 됩니다.

크롤링 데이터를 저장하기 위해 크롤링 본 서버와 같은 데이터베이스 환경을 구성해야 합니다.<br>
아래와 같이 마이그레이션을 실행시켜주세요.
<pre>
$ sequelize db:migrate --env [database env]
</pre>

> **마이그레이션을 실행하기 전에**
> 1. sequelize-cli와 mysql을 npm을 통해 수동으로 설치해주세요.<br>
> 2. 사용할 데이터베이스 정보를 .env와 config/config.json 파일에 기술해주세요. (예제 .env.example, .config.example.json 파일을 참고해 주시길 바랍니다.)

### 서비스 실행

`TypeScript` 로 작성된 서비스 애플리케이션이 `ts-node`를 통하여 별도의 트랜스 컴파일링 없이 실행됩니다.<br>
별다른 옵션이 없다면, REST API 서버와 크롤러가 동시에 실행됩니다.
<pre>
$ npm start
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

