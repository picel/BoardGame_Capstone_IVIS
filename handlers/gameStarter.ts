import Game from "../models/game";
import User from "../models/user";

import errorHandler from "./errorHandler";
import jokerInit from "../controllers/joker/gameInit";

export default function (socket: any, games: Game[]) {
    // find socket's game
    let game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)));
    if (!game) {
        errorHandler(1, socket);
        return;
    }

    let room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id));
    if (!room) {
        errorHandler(2, socket);
        return;
    }

    let code: number = game.getCode();

    switch (code) {
        case 0: // joker
            jokerInit(room);
            break;
        default:
            errorHandler(1, socket);
            break;
    }
}