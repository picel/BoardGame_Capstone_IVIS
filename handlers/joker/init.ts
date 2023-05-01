import User from "../../models/user";

import initializeDeck from "../../functions/joker/initializeDeck";
import removeDuplicates from "../../functions/joker/removeDuplicates";
import Room from "../../models/room";
import sendRole from "./sendRole";

export default function (room: Room) {
    let users: User[] = room.getUsers();
    let decks: string[][] = initializeDeck(users.length);
    for (let i = 0; i < users.length; i++) {
        users[i].setDeck(removeDuplicates(decks[i]));
        users[i].getSocket().emit('deck', users[i].getDeck());
    }
    sendRole(room);
    return
}