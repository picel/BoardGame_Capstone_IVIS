import Game from '../../models/game';
import User from '../../models/user';

import createRoom from './createRoom';

export default function (socket:any, game: Game) {
    console.log("init start " + game)

    let limit = game.getLimit();
    let waiting_queue = game.getWaitingQueue();
    
    let user = new User(socket.id, socket);
    waiting_queue.push(user);
    
    console.log("id set! " + socket.id);
    socket.emit('set_id', socket.id);

    if (waiting_queue.length >= limit) {
	console.log("room created!")
        createRoom(game);
    }
}
