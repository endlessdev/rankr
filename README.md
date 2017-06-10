<p align="center">
    <img width="350" src='https://cdn.rawgit.com/endlessdev/rankr/master/rankr.svg'/><br>
    <b><span>대한민국 포털사이트 검색어 기반<br>실시간 통합정보분석 서비스</span></b><br><br>
    <a><img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square"></a>
    <a href="https://circleci.com/gh/endlessdev/rankr/tree/master"><img src="https://img.shields.io/circleci/project/github/endlessdev/rankr.svg?style=flat-square"></a>
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

`TypeScript` 언어로 작성된 서비스 애플리케이션이 `ts-node`를 통하여 별도의 트랜스 컴파일링 없이 실행됩니다.<br>

<pre>
$ npm start
</pre>

크롤러와 같이 실행하고 싶다면, 아래와 같이 실행해주세요.

<pre>
$ npm run start-with-crawler
</pre>


## Rankr REST API

각 포털사이트의 인기검색어를 기반한 가공데이터를 REST API 형식으로 제공됩니다.<br>
해당 API를 사용하기 위해서 아래의 본 서버의 API를 이용해주세요.

<pre>
https://api.rankr.narin.us
</pre>

## RANK API (prefix : /rank)
각 포털사이트의 실시간 급상승 검색어를 응답받을 수 있습니다.
### `GET(/naver)` Naver 실시간 급상승 검색어
네이버의 실시간 급상승 검색어를 PC 웹페이지에서 HTML파싱을 거쳐 응답합니다.
#### Example Response 
```JSON
{
"resultCode": 200,
"rankType": "naver",
"requestDate": "2017-06-05T13:04:50.186Z",
"data": [
    {
      "rank": 1,
      "title": "제보자들"
    },
  ...
  ]
}
```

> 해당 포털사이트에서 급상승 트래킹 서비스를 시작하여 변동사항 파라미터 (e.g status, value)가 제외되었습니다. 이용하실때 참고하시길 바랍니다.

### `GET(/daum)` Daum 실시간 급상승 검색어
다음의 실시간 급상승 검색어를 PC 웹페이지에서 HTML파싱을 거쳐 응답합니다.
#### Example Response 
```JSON
{
"resultCode": 200,
"rankType": "daum",
"requestDate": "2017-06-05T13:04:50.186Z",
"data": [
    {
      "rank": 1,
      "title": "제보자들",
      "value": "244",
      "status": "up"
    },
  ...
  ]
}
```
### `GET(/nate)` Nate 실시간 급상승 검색어
네이트의 실시간 급상승 검색어를 PC 웹페이지에서 HTML파싱을 거쳐 응답합니다.
#### Example Response 
```JSON
{
"resultCode": 200,
"rankType": "nate",
"requestDate": "2017-06-05T13:04:50.186Z",
"data": [
    {
      "rank": 1,
      "title": "제보자들",
      "value": "244",
      "status": "up"
    },
  ...
  ]
}
```
> 해당 포털사이트는 Daum의 검색엔진과 실시간 급상승 검색어를 사용하기 때문에 곧 Deprecate 될 예정입니다.

### `GET(/zum)` Zum 실시간 급상승 검색어
Zum의 실시간 급상승 검색어를 PC 웹페이지에서 HTML파싱을 거쳐 응답합니다.
#### Example Response 
```JSON
{
"resultCode": 200,
"rankType": "zum",
"requestDate": "2017-06-05T13:04:50.186Z",
"data": [
    {
      "rank": 1,
      "title": "제보자들"
    },
  ...
  ]
}
```
## Analytics API (prefix : /analytics)
각 포털사이트의 실시간 급상승 검색어의 크롤링 데이터에 기반한 분석결과를 받아볼 수 있습니다.

### `GET(/recent)` 최근 1시간 평균 통계
크롤링이 진행되는 모든 포털사이트의 급상승 인기검색어를 기반으로 최근 1시간 이내의 키워드 중 누적 진입수와 평균 순위를 바탕으로 정렬하여 상위 10개의 데이터를 반환합니다.

#### Example Response 
```JSON
[
 {
    "title": "현충일",
    "rank_count": 3911,
    "rank_avg": 7.2646
 },
...
]
```

### `GET(/recent)` 최근 24시간 평균 통계
크롤링이 진행되는 모든 포털사이트의 급상승 인기검색어를 기반으로 최근 24시간 이내의 키워드 중 누적 진입수와 평균 순위를 바탕으로 정렬하여 전체 데이터를 반환합니다.

#### Example Response 
```JSON
[
 {
    "title": "현충일",
    "rank_count": 3911,
    "rank_avg": 7.2646
 },
...
]
```

### `GET(/search/:keyword)` 특정 키워드 분석

각 포털사이트의 실시간 급상승 검색어의 크롤링 데이터에 기반하여 특정 키워드의 분석결과를 받아볼 수 있습니다.
#### Example Response 
```JSON
{
  "naver": [{
    "createdAt": "2017-06-04T13:23:00.000Z",
    "rank_crawl_idx": 46100,
    "rank": 2,
    "title": "가인"
  },
  ...
  "daum" : [...],
  "zum" : [...]
}
```

## News API (prefix : /news)

### `GET(/search/:keyword)` 특정 키워드로 검색된 뉴스 파싱

네이버 통합 뉴스 RSS를 이용하여 특정 키워드로 검색된 뉴스의 데이터를 반환합니다.

#### Example Response 
```JSON
[
  {
    "title": "주지훈, \"사랑할 시간도 아까운데 화낼 시간이 어디있냐\"...대마초 권유 폭로해도?",
    "link": "http://www.ujnews.co.kr/news/articleView.html?idxno=267173",
    "description": "사진=방송캡쳐 주지훈, \"사랑할 시간도 아까운데 화낼 시간이 어디있냐\"...대마초 권유 폭로해도 그럴까 가수 가인이 주지훈의 지인에게 대마초를 권유 받은 사실을 폭로해 논란이 된 가운데 과거 연인 가인에 대한 주지훈의...",
    "pubDate": "in 9 hours",
    "author": "울산종합일보",
    "category": "섹션없음",
    "thumb": "http://imgnews.naver.net/image/thumb/5354/2017/06/05/27019.jpg"
  },
  ...
]
```


## 크롤러

크롤러는 본 서비스가 지원하는 각각의 포털사이트를 **1분에 한번씩 접속**하여 실시간 급상승 검색어를 사용자가 지정한 데이터베이스에 저장합니다.


### 데이터베이스

데이터베이스의 원활한 관리 및 활용을 위하여 `Sequelize` ORM을 사용하여 개발하도록 작성되었습니다.<br>
앞으로 데이터베이스의 추가나 수정은 마이그레이션 및 모델을 수정하여 사용합니다.

#### 데이터베이스 구조

![데이터베이스 구조](http://i.imgur.com/N1hCUp7.png)

## 마일스톤

 - [ ] 구글 트렌드 데이터 가공
 - [x] 시각화 웹 페이지 (현재 개발중)
 - [x] 뉴스 콘텐츠 파싱 및 크롤링
 - [ ] 뉴럴네트워크 구축 및 서비스 활용
 - [ ] 글로벌 화 (중국, 일본)

## 라이센스

본 프로젝트는 MIT 라이센스를 따릅니다.

Copyright © 2017 Narin inc.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
