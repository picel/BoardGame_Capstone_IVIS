import Room from "../../models/room";
import User from "../../models/user";
import sendRole from "../sendRole";
import initializeDeck from "./initializeDeck";

export default function (room: Room) {
    let users: User[] = room.getUsers();
    
    let decks: string[][] = initializeDeck(users.length);

    for (let i = 0; i < users.length; i++) {
        users[i].setDeck(decks[i]);
    }

    for (let i = 0; i < users.length; i++) {
        let result: any = {};

        result['myDeck'] = users[i].getDeck();
        result['enemyDeckSize'] = users[(i + 1) % users.length].getDeck().length;
        result['myShowDeck'] = users[i].getShowDeck();
        result['enemyShowDeck'] = users[(i + 1) % users.length].getShowDeck();

        console.log(result);

        if (users[i].getSocket() !== undefined) {
            setTimeout(function() {
                users[i].getSocket().emit('poker_deck', result);
            }, 1000);
        }
    }
    
    sendRole(room);

    room.getTimer().startTimer(room, 17);


    return
}