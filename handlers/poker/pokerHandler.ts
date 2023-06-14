import Room from "../../models/room";
import User from "../../models/user";
import Game from "../../models/game";

import onPeek from "../joker/onPeek";

import errorHandler from "../exceptionHandler";
import Timer from "../../models/timer";
import onSelect from "./onSelect";
import nextTurn from "../../controllers/poker/nextTurn";

export default function (socket: any, games: Game[]) {
    socket.on('poker_peek', function(index: number) {
        console.log("poker_peek" + index);
        let game: Game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)))!;
        let room: Room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id))!;
        let users: User[] = room.getUsers();
        // get user by socket id
        let user: User = users.find((u) => u.getUuid() === socket.id)!;
        let opponent = room.getOpponents(user.getUuid())[0];

        if (opponent.getSocket() !== undefined) {
            opponent.getSocket().emit('poker_peek', index);
        }
    });

    socket.on('poker_guess', async function(guess: string) {
        console.log("poker_guess" + socket.id + ": " + guess);
        let game: Game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)))!;
        let room: Room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id))!;
        let users: User[] = room.getUsers();
        // get user by socket id
        let user: User = users.find((u) => u.getUuid() === socket.id)!;
        let opponent = room.getOpponents(user.getUuid())[0];

        if (opponent.getSocket() !== undefined) {
            opponent.getSocket().emit('poker_guess', guess);
        }

        if (room.getGuess() === '') {
            room.getTimer().stopTimer();
            room.getTimer().startTimer(room, 17);
        }
        room.setGuess(guess);
    });

    socket.on('poker_answer', async function(answer: string) {
        console.log("poker_answer" + socket.id + ": " + answer);
        let game: Game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)))!;
        let room: Room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id))!;
        let users: User[] = room.getUsers();
        // get user by socket id
        let user: User = users.find((u) => u.getUuid() === socket.id)!;
        let opponent = room.getOpponents(user.getUuid())[0];

        if (opponent.getSocket() !== undefined) {
            opponent.getSocket().emit('poker_answer', answer);
        }

        room.setAnswer(answer);

        let timer: Timer = room.getTimer();
        timer.stopTimer();
        timer.startTimer(room, 17);
    });

    socket.on('poker_select', async function(index: number, select: boolean) {
        console.log("poker_select" + socket.id + ": " + index + " " + select);
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

        let answer: string = room.getAnswer();

        onSelect(index, select, answer, defender, attacker);

        room.resetAnswernGuess();

        let timer: Timer = room.getTimer();
        timer.stopTimer();

        nextTurn(room);
    });
}