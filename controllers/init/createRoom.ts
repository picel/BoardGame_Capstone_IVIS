import Game from '../../models/game';
import Room from '../../models/room';
import User from '../../models/user';

export default function (game: Game) {
    let room_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let room = new Room(room_id);
    let rooms = game.getRooms();
    
    let users: User[];
    let isAI = game.getIsAI();
    if (isAI) {
        users = game.popWaitingQueueAI();
        let ai = new User("ai", undefined);
        users.push(ai);
    } else {
        users = game.popWaitingQueue();
    }

    users.forEach((user) => {
        room.addUser(user);
        user.setRoom(room_id);
        console.log("room number is " + room.getRoomId())
        if (user.getSocket() !== undefined) {
            user.getSocket().emit('set_room', room.getRoomId());
        }
    });
    rooms.push(room);
}
