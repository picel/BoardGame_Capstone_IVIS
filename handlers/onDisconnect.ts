import Game from "../models/game";

import errorHandler from "./errorHandler";

export default function (socket: any, games: Game[]) {
    console.log("disconnected " + socket.id)
    // if user is in game, run this
    let game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)));
    if (game) {
        let room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id));
        if (!room) {
            errorHandler(2, socket);
            return
        }

        let chicken = room.getUsers().find((u) => u.getUuid() === socket.id);
        if (chicken) {
            room.getUsers().filter((user) => user.getUuid() !== socket.id);
        } else {
            errorHandler(3, socket);
            return
        }
        let room_id = room.getRoomId();

        // if user is in a room, send result 1 to all users in the room
        if (chicken.getRoom()) {
            let opponents = room.getOpponents(chicken.getUuid());
            if (opponents.length > 0) {
                for (let opponent of opponents) {
                    opponent.getSocket().emit('result', 1);
                }
            }
            games = games.filter((g) => g.getRooms().find((r) => r.getRoomId() !== room_id));
        }
    } else {
        // remove chicken from waiting list in any games
        for (let game of games) {
            let waiting = game.getWaitingQueue();
            if (waiting) {
                waiting = waiting.filter((u) => u.getUuid() !== socket.id);
                console.log("the chicken was in waiting queue");
            }
        }
    }
}