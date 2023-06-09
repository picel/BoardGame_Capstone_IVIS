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
    let user = room.getUsers().find((u) => u.getUuid() === socket.id);
    if (!user) {
        errorHandler(3, socket);
        return
    }
    if (user.getSocket() !== undefined) {
        user.setEmotion(JSON.stringify(emotion));
    }
    
    let opponents = room.getOpponents(socket.id);

    opponents.forEach((opponent) => {
        if (opponent.getSocket() !== undefined) {
            opponent.getSocket().emit('emotion', emotion);
        }
    });
    
    // console.log(JSON.stringify(emotion));
}