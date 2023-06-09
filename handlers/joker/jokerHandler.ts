import Room from "../../models/room";
import User from "../../models/user";
import Game from "../../models/game";

import onPeek from "./onPeek";
import onSelect from "./onSelect";

import errorHandler from "../exceptionHandler";
import nextTurn from "../../controllers/joker/nextTurn";
import Timer from "../../models/timer";
import wait from "waait";
import { Configuration, OpenAIApi } from "openai";
import runPrompt from "../../controllers/runPrompt";

export default function (socket: any, games: Game[]) {
    socket.on('peek', function(index: number) {
        console.log("peek" + index);
        let game: Game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)))!;
        let room: Room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id))!;
        let users: User[] = room.getUsers();
        // get user by socket id
        let user: User = users.find((u) => u.getUuid() === socket.id)!;
        let opponent = room.getOpponents(user.getUuid())[0];
        onPeek(index, opponent.getSocket());
    });

    socket.on('select', async function(index: number) {
        console.log("select" + socket.id + ": " + index);
        let game: Game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)))!;
        let room: Room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id))!;
        let users: User[] = room.getUsers();
        let attacker: User = users[room.getTurn()];
        let defender: User = users[(room.getTurn() + 1) % users.length];
        let requester: User = users.find((u) => u.getUuid() === socket.id)!;
        if (requester !== attacker) {
            errorHandler(10, socket);
            return;
        }
        onSelect(index, defender, attacker);
        
        let timer: Timer = room.getTimer();
        timer.stopTimer();

        if (!await nextTurn(room)) {
            if (defender.getSocket() === undefined) { // AI의 차례일 경우
                timer.stopTimer(); // AI의 응답이 느릴 경우를 대비해 타이머를 멈춤
    
                let enemyDeckSize: number = users[(room.getTurn() + 1) % users.length].getDeck().length; // 상대의 덱 사이즈
                let randomNum: number = Math.floor(Math.random() * enemyDeckSize); // 랜덤으로 상대의 카드를 선택
    
                // peek event to enemy
                let enemySocket: any = users[(room.getTurn() + 1) % users.length].getSocket(); // 상대의 소켓 가져오기
                if (enemySocket !== undefined) { // 상대방이 AI가 아닐 경우
                    setTimeout(() => {
                        enemySocket.emit('peek', randomNum); // 임시 선택 이벤트를 발생시킴
                    }, 1000);
                }
                console.log("peek" + randomNum);
    
                // sleep for 3 seconds
                await wait(4000); // 4초간 대기
    
                let prompt: string = '0 : ['; // prompt 초기화, 첫번째 감정 정보 시작
                let enemyEmotion: string[] = users[(room.getTurn() + 1) % users.length].getEmotions(); // 상대의 3초간의 감정 정보를 가져옴
    
                for (let i = 0; i < enemyEmotion.length; i++) {
                    prompt += enemyEmotion[i]; // prompt에 상대의 감정 정보를 추가
                }
                prompt += '], 1 : ['; // 두번째 감정 정보 시작
                
                let randNum2: number = - 1;
                do {
                    randNum2 = Math.floor(Math.random() * enemyDeckSize); 
                } while (randomNum === randNum2); // 이전에 선택한 카드와 다른 카드를 선택하도록 함
    
                if (enemySocket !== undefined) {
                    enemySocket.emit('peek', randNum2); // 임시 선택 이벤트를 발생시킴
                }
                console.log("peek" + randNum2);
    
                await wait(4000); // 4초간 대기
    
                enemyEmotion = users[(room.getTurn() + 1) % users.length].getEmotions(); // 상대의 3초간의 감정 정보를 가져옴
                for (let i = 0; i < enemyEmotion.length; i++) {
                    prompt += enemyEmotion[i]; // prompt에 상대의 감정 정보를 추가
                }
                // prompt에 둘 중 더 불안정한 감정 정보를 선택하고, 0 또는 1의 응답만 하도록 함
                prompt += ']\n this is enemy\'s emotion. which one is more unstable? if first one is more unstable, answer only 0, else answer only 1';
    
                // runPromt
                let answer: string = await runPrompt(prompt); // prompt를 GPT-3에 전달하여 답변을 받음
                // 답변에서 불필요한 공백 제거
                answer = answer.replace(/\s/gi, '');
    
                let selection: number = -1;
                if (answer === '0') {
                    selection = randNum2; // 첫번째 감정 정보가 더 불안정할 경우 조커 카드로 간주하여 두번째 카드를 선택
                } else if (answer === '1') {
                    selection = randomNum; // 두번째 감정 정보가 더 불안정할 경우 첫번째 카드를 선택
                } else {
                    selection = Math.floor(Math.random() * 2); // AI가 판단하지 못한 경우로 간주하며 랜덤으로 선택
                }
                
                attacker = users[room.getTurn()];
                let defender: User = users[(room.getTurn() + 1) % users.length];
                onSelect(selection, defender, attacker); // 선택 이벤트를 발생시킴
    
                console.log("select" + socket.id + ": " + selection);
                
                await nextTurn(room);
            }
        }
    });
}