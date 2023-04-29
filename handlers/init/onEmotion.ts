import Game from "../../models/game";
import errorHandler from "../errorHandler";

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
    
    let opponents = room.getOpponents(socket.id);

    console.log(socket.id + " : " + emotion);

    opponents.forEach((opponent) => {
        opponent.getSocket().emit('emotion', emotion);
    });
}