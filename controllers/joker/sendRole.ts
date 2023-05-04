import Room from "../../models/room";
import User from "../../models/user";

export default function (room: Room) {
    let turn: number = room.getTurn();
    let users: User[] = room.getUsers();
    
    for (let i = 0; i < users.length; i++) {
        setTimeout(function() {
            if (i === turn) {
                users[i].getSocket().emit('role', 1);
            } else {
                users[i].getSocket().emit('role', 0);
            }
        } , 1000);
    }
    return
}