/** --------------------- HANDLER IMPORTS --------------------- */
import InitHandler from './handlers/initHandler';
import onDisconnect from './handlers/init/onDisconnect';
/** ----------------------------------------------------------- */

/** ---------------------- MODEL IMPORTS ---------------------- */
import Game from './models/game';
/** ----------------------------------------------------------- */


export default function (io: any) {
    let games = [
        new Game(2)
    ];

    io.on('connection', function (socket: any) {
        // console.log("connected " + socket.id)

        socket.on('disconnect', function () {
            onDisconnect(socket, games);
        });
        
        InitHandler(socket, games);

        // socket.on('message', function (msg) {
        //     io.emit('message', msg);
        // });
    });
}
