import Game from "../../models/game";
import errorHandler from "../exceptionHandler";

export default function (games: Game[], emotion: string, socket: any) {
    let game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)));
    if (!game) {
        errorHandler(1, socket);
        return
    }

    let room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id));
    if (!room) {
        errorHandler(2, socket);
        return
    }

    // set emotion
    let user = room.getUsers().find((u) => u.getUuid() === socket.id); // emotion 이벤트를 보낸 유저 찾기
    if (!user) {
        errorHandler(3, socket);
        return
    }
    if (user.getSocket() !== undefined) {
        user.setEmotion(JSON.stringify(emotion)); // 유저 객체에 emotion 정보를 JSON 형태로 저장
    }
    
    let opponents = room.getOpponents(socket.id); // emotion 이벤트를 보낼 상대방 플레이어 찾기

    opponents.forEach((opponent) => { // 상대 플레이어들에게 emotion 이벤트 보내기
        if (opponent.getSocket() !== undefined) {
            opponent.getSocket().emit('emotion', emotion);
        }
    });
}