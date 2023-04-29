# 2023 캡스톤디자인
온라인 감정표현 보드게임

## 개발 환경
- Node.js
    - `Typescript`
    - `Express`
    - `Socket.io`

## 서버 정보
Oracle Cloud Free Tier
> OS : Ubuntu 20.04<br>
> Architecture : ARM64

## 이벤트 정보
- `connection` : 클라이언트가 서버에 접속
- `disconnect` : 클라이언트가 서버에서 접속 해제
- `init` : 클라이언트가 매칭을 요청
    - game: *number* : 게임 고유 번호
- `ready` : 클라이언트가 게임 시작 준비 완료
    - sign: *string* : 게임 시작 준비 완료 표시

- `emotion` : 클라이언트의 감정 정보 전송
    - emotion: *string(JSON)* : 감정 정보

## 실행 방법
- `git clone https://github.com/picel/BoardGame_Capstone_IVIS.git`
- `cd BoardGame_Capstone_IVIS`
- `npm install`
<br><br>
- 빌드 후 실행
    - `npx tsc` : Typescript 컴파일
    - `node ./dist/index.js` : 서버 실행
- 빌드 없이 실행
    - `npx ts-node ./index.ts` : 서버 실행
