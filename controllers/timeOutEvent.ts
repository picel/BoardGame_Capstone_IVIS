import Room from "../models/room";

export default function (room: Room) {
    let users = room.getUsers();
    let turn = room.getTurn();
    let attacker = users[turn];
    let opponents = room.getOpponents(attacker.getUuid());

    if (room.getGuess() !== '' && room.getAnswer() === '') {
        opponents[0].getSocket().emit('result', 3);
        attacker.getSocket().emit('result', 1);
    } else {
        attacker.getSocket().emit('result', 3);

        for (let opponent of opponents) {
            if (opponent.getSocket() === undefined) continue;
            opponent.getSocket().emit('result', 1);
        }

        console.log("Time Out! User" + attacker.getUuid() + " is the Loser!");
    }  
}