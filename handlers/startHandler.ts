import Game from "../models/game";

import exceptionHandler from "./exceptionHandler";
import jokerInit from "../controllers/joker/gameInit";

export default function (socket: any, games: Game[]) {
    // find socket's game
    let game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)));
    if (!game) {
        exceptionHandler(1, socket);
        return;
    }

    let room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id));
    if (!room) {
        exceptionHandler(2, socket);
        return;
    }

    let code: number = game.getCode();

    switch (code) {
        case 0: // joker
            jokerInit(room);
            break;
        default:
            exceptionHandler(1, socket);
            break;
    }
}