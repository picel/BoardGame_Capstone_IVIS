/** --------------------- HANDLER IMPORTS --------------------- */
import InitHandler from './handlers/initHandler';
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
        
        InitHandler(socket, games);

        // socket.on('message', function (msg) {
        //     io.emit('message', msg);
        // });
    });
}
