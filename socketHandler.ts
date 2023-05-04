/** --------------------- HANDLER IMPORTS --------------------- */
import InitHandler from './handlers/initHandler';
import jokerHandler from './handlers/jokerHandler';
import onDisconnect from './handlers/onDisconnect';
/** ----------------------------------------------------------- */

/** ---------------------- MODEL IMPORTS ---------------------- */
import Game from './models/game';
/** ----------------------------------------------------------- */


export default function (io: any) {
    let games = [
        new Game(0, 2)
    ];

    io.on('connection', function (socket: any) {
        // console.log("connected " + socket.id)

        socket.on('disconnect', function () {
            onDisconnect(socket, games);
        });
        
        InitHandler(socket, games);

        jokerHandler(socket, games[0]);

        // socket.on('message', function (msg) {
        //     io.emit('message', msg);
        // });
    });
}
