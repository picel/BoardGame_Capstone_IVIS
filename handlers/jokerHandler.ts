import Room from "../models/room";
import User from "../models/user";
import Game from "../models/game";

import onPeek from "./joker/onPeek";
import onSelect from "./joker/onSelect";

import errorHandler from "./exceptionHandler";
import nextTurn from "../controllers/joker/nextTurn";
import Timer from "../models/timer";

export default function (socket: any, game: Game) {
    socket.on('peek', function(index: number) {
        console.log("peek" + index);
        let room: Room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id))!;
        let users: User[] = room.getUsers();
        let attacker: User = users[room.getTurn()];
        let defender: User = users[(room.getTurn() + 1) % users.length];
        let requester: User = users.find((u) => u.getUuid() === socket.id)!;
        // if (requester !== attacker) {
        //     errorHandler(10, socket);
        //     return;
        // }
        onPeek(index, defender);
    });

    socket.on('select', function(index: number) {
        console.log("select" + socket.id + ": " + index);
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

        nextTurn(room);
    });
}