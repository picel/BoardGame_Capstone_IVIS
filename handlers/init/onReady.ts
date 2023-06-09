import Game from "../../models/game";
import Room from "../../models/room";

import errorHandler from "../exceptionHandler";

export default function (sign: string, games: Game[], socket: any): boolean {
    console.log(socket.id + " ready!")
    if (sign === 'ok') {
        let game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)));
        if (!game) {
            errorHandler(1, socket);
            return false;
        }

        let room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id));
        if (!room) {
            errorHandler(2, socket);
            return false;
        }

        room.setReady(socket.id);

        console.log(room.getUsers().length + " 사용자 수")
        console.log(room.getReady() + " 준비된 사용자 수")

        let limit = room.getUsers().length;
        if (game.getIsAI()) {
            limit -= 1;
        }
        if (room.getReady() === limit) {
            console.log("all user ready!")
            room.getUsers().forEach((user) => {
                if (user.getSocket() !== undefined) {
                    user.getSocket().emit('ready', 'ok');
                }
                user.setInGame(true);
            });
            return true;
        }
    }
    return false;
}