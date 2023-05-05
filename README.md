# 2023 캡스톤디자인
온라인 감정표현 보드게임

## 개발 진행 상황
- ~~User, Room, Game 객체 정의~~
- ~~소켓 통신을 통한 매칭 구현~~
- ~~대기열 및 방 분리 기능 구현~~
- ~~게임 시작 준비 기능 구현~~
- ~~감정 정보 전송 중계 기능 구현~~
- ~~타이머 기능 구현~~
- ~~조커 게임 구현~~
    - ~~게임 이벤트 구현~~
    - ~~게임 종료 구현~~
    - ~~게임 결과 전송 구현~~
    - ~~disconnect 이벤트 핸들러 구현~~
- 테스팅

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

### initialize (공통 실행 과정)
![init](https://user-images.githubusercontent.com/30901178/235572486-92dfe7b3-6932-4ecd-b794-cbf1c0de5bcc.png)
#### listen
- `init` : 클라이언트가 매칭을 요청
    - game(number) : 게임 고유 번호
- `ready` : 클라이언트가 게임 시작 준비 완료
    - sign(string) : 게임 시작 준비 완료 표시
- `emotion` : 클라이언트의 감정 정보 전송
    - emotion(JSON) : 감정 정보

#### emit
- `set_id` : 사용자의 uuid 전송 (init 수신 후)
    - id(string) : 사용자의 uuid
- `set_room` : 매칭된 방의 id 전송
    - room(string) : 매칭된 방의 id
- `ready` : 서버가 게임 시작 준비 완료
    - sign(string) : 게임 시작 준비 완료 표시
- `emotion` : 수신된 감정 정보 전송
    - emotion(JSON:string[float]) : 감정 정보

### joker card game (old maid)
![joker](https://user-images.githubusercontent.com/30901178/235572550-e07a0772-0522-430e-91b3-e084fc01a716.png)
#### listen
- `peek` : 카드 임시 선택
    - index(string) : 선택한 카드의 인덱스
- `select` : 카드 선택 확정
    - index(string) : 선택한 카드의 인덱스

#### emit
- `deck` : 정리된 패 전송
    - deck([]string), enemy(number) : 중복값이 제거된 패, 상대방의 카드 수
- `role` : 역할 전송
    - role(bool) : true면 자신의 차례, false면 상대의 차례
- `peek` : 카드 임시 선택
    - index(number) : 선택한 카드의 인덱스
- `select` : 카드 선택 확정
    - index(number) : 선택한 카드의 인덱스
- `result` : 게임 결과 전송
    - result(number) : 
        - 0 : -
        - 1 : 승리
        - 2 : 패배
        - 3 : 판정패 (시간 초과)
- `exception` : 예외 발생 시 전송
    - exception(string) : 예외 정보

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

## 주의 사항
- PORT는 기본적으로 3000번으로 설정되어 있습니다.<br>환경 변수(`process.env.PORT`)를 통해 변경할 수 있습니다.