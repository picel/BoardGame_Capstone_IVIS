import Game from "../models/game";

import exceptionHandler from "./exceptionHandler";
import jokerInit from "../controllers/joker/gameInit";
import pokerInit from "../controllers/poker/gameInit";

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

    if (code === 0 || code === 1 || code === 2 || code === 3) {
        jokerInit(room);
    } else if (code === 4) {
        pokerInit(room);
    } else {
        exceptionHandler(1, socket);
    }
}