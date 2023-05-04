import removeDuplicates from "./removeDuplicates";
import Room from "../../models/room";
import User from "../../models/user";
import sendRole from "./sendRole";
import checkGameSet from "./checkGameSet";

export default function (room: Room) {
    room.nextTurn();
    sendRole(room);

    let users: User[] = room.getUsers();

    for (let i = 0; i < users.length; i++) {
        let deck: string[] = users[i].getDeck();
        let cleanDeck: string[] = removeDuplicates(deck);
        // then shuffle
        cleanDeck.sort(() => Math.random() - 0.5);

        users[i].setDeck(cleanDeck);
    }

    for (let i = 0; i < users.length; i++) {
        let result: any = {};

        result['myDeck'] = users[i].getDeck();
        result['enemyDeckSize'] = users[(i + 1) % users.length].getDeck().length;

        console.log(users[i].getSocket().id, result['myDeck']);

        users[i].getSocket().emit('deck', result);
    }

    let flag: boolean = checkGameSet(users);

    if (flag) {
        return;
    }
}