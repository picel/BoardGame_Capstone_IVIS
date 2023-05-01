import removeDuplicates from "../../functions/joker/removeDuplicates";
import Room from "../../models/room";
import User from "../../models/user";
import sendRole from "./sendRole";

export default function (room: Room) {
    room.nextTurn();
    sendRole(room);

    let users: User[] = room.getUsers();

    users.forEach(user => {
        let deck: string[] = user.getDeck();
        
        user.setDeck(removeDuplicates(deck));
        user.getSocket().emit('deck', user.getDeck());
    });
}