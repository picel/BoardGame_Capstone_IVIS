import User from "../../models/user";

import initializeDeck from "./initializeDeck";
import removeDuplicates from "./removeDuplicates";
import Room from "../../models/room";
import sendRole from "./sendRole";

export default function (room: Room) {
    function initialize (len: number) {
        let decks: string[][] = initializeDeck(len);

        for (let i = 0; i < len; i++) {
            users[i].setDeck(removeDuplicates(decks[i]));
        }
    }

    let users: User[] = room.getUsers();
    
    let flag: boolean = false;
    do {
        initialize(users.length);

        flag = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].getDeck().length === 0) {
                flag = true;
                break;
            }
        }
    } while (flag);
    

    for (let i = 0; i < users.length; i++) {
        let result: any = {};

        result['myDeck'] = users[i].getDeck();
        result['enemyDeckSize'] = users[(i + 1) % users.length].getDeck().length;

        users[i].getSocket().emit('deck', result);
    }
    sendRole(room);
    return
}