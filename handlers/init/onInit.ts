import Game from '../../models/game';
import User from '../../models/user';

import createRoom from '../../controllers/init/createRoom';

export default function (socket:any, game: Game) {
    console.log("init start ");

    let limit = game.getLimit();
    let waiting_queue = game.getWaitingQueue();
    
    let user = new User(socket.id, socket);
    waiting_queue.push(user);
    
    console.log("id set! " + socket.id);
    socket.emit('set_id', socket.id);

    if (game.getIsAI()) {
        if (waiting_queue.length >= limit - 1) {
            console.log("room with ai created!");
            createRoom(game);
        }
    } else {
        if (waiting_queue.length >= limit) {
            console.log("room created!");
            createRoom(game);
        }
    }
}
