import Room from "../../models/room";

export default function (room: Room) {
    let users = room.getUsers();
    let turn = room.getTurn();
    let attacker = users[turn];
    let opponents = room.getOpponents(attacker.getUuid());

    attacker.getSocket().emit('result', 3);

    for (let opponent of opponents) {
        opponent.getSocket().emit('result', 1);
    }

    console.log("Time Out! User" + attacker.getUuid() + " is the Loser!");
}