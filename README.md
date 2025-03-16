
## 시연 영상

https://github.com/user-attachments/assets/b65578da-2e8c-40da-afc1-8fe4f381e5e7

## 실행 방법

패키지 설치

```
npm i
```

next.js 실행
```
npm run dev
```

로컬에서 json 서버 실행
```
npm run json-server
```

## 프로젝트 소개

### 기술

Next.js 15, Tailwindcss, Tanstack Query, json-server

### 기능

Next.js 로 만든 투두 리스트 앱 입니다. 아래와 같은 기능을 개발하였습니다.

- 할일 등록
- 할일 조회
- 할일 수정
- 할일 삭제
- 완료 필터링

## 배포 링크
vercel 에 배포

https://jmj-to-do-list.vercel.app/


## 프로젝트 구조
![스크린샷 2025-03-16 오전 12 29 31](https://github.com/user-attachments/assets/16155cf7-9135-4c62-8563-1709d9eddaf3)

- useTodosData 커스텀 훅을 만들어 fetch 관련 기능을 한곳에 관리
- FilterContext 를 만들어서 할일 보기 필터를 관리하
