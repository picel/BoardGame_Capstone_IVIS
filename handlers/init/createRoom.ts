import Game from '../../models/game';
import Room from '../../models/room';

export default function (game: Game) {
    let room_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let room = new Room(room_id);
    let rooms = game.getRooms();
    
    let users = game.popWaitingQueue();
    users.forEach((user) => {
        room.addUser(user);
        user.setRoom(room_id);
        // send message to user
	console.log("room number is " + room.getRoomId())
        user.getSocket().emit('set_room', room.getRoomId());
    });
    rooms.push(room);
}
