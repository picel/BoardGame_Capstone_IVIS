/** --------------------- HANDLER IMPORTS --------------------- */
import InitHandler from './handlers/initHandler';
import jokerHandler from './handlers/joker/jokerHandler';
import disconnectHandler from './handlers/disconnectHandler';
/** ----------------------------------------------------------- */

/** ---------------------- MODEL IMPORTS ---------------------- */
import Game from './models/game';
import pokerHandler from './handlers/poker/pokerHandler';
/** ----------------------------------------------------------- */


export default function (io: any) {
    let games = [
        new Game(0, 2), // joker pvp
        new Game(1, 2, true), // joker pve level 1
        new Game(2, 2, true), // joker pve level 2
        new Game(3, 2, true), // joker pve level 3
        new Game(4, 2) // poker pvp
    ];

    io.on('connection', function (socket: any) {
        // console.log("connected " + socket.id)

        socket.on('disconnect', function () {
            disconnectHandler(socket, games);
        });
        
        InitHandler(socket, games);

        jokerHandler(socket, games);

        pokerHandler(socket, games);
    });
}
