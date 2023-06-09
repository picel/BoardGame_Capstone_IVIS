import Room from "../../models/room";
import User from "../../models/user";
import sendRole from "../sendRole";
import checkGameSet from "./checkGameSet";

export default function (room: Room) : boolean {
    room.nextTurn();
    sendRole(room);

    let users: User[] = room.getUsers();

    for (let i = 0; i < users.length; i++) {
        if (users[i].getSocket() === undefined) continue;

        let result: any = {};

        result['myDeck'] = users[i].getDeck();
        result['enemyDeckSize'] = users[(i + 1) % users.length].getDeck().length;
        result['myShowDeck'] = users[i].getShowDeck();
        result['enemyShowDeck'] = users[(i + 1) % users.length].getShowDeck();

        console.log(users[i].getSocket().id, result['myDeck']);

        users[i].getSocket().emit('poker_deck', result);
    }

    let flag: boolean = checkGameSet(users);

    if (flag) {
        return true;
    } else {
        room.getTimer().startTimer(room, 17);
        return false;
    }
}