import removeDuplicates from "./removeDuplicates";
import Room from "../../models/room";
import User from "../../models/user";
import sendRole from "./sendRole";

export default function (room: Room) {
    room.nextTurn();
    sendRole(room);

    let users: User[] = room.getUsers();

    for (let i = 0; i < users.length; i++) {
        let deck: string[] = users[i].getDeck();
        users[i].setDeck(removeDuplicates(deck));
    }

    for (let i = 0; i < users.length; i++) {
        let result: any = {};

        result['myDeck'] = users[i].getDeck();
        result['enemyDeckSize'] = users[(i + 1) % users.length].getDeck().length;

        users[i].getSocket().emit('deck', result);
    }
}