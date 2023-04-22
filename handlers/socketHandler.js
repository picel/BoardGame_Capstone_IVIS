/** --------------------- HANDLER IMPORTS --------------------- */
import onInit from './init/onInit.js';
import onDisconnect from './init/onDisconnect.js';
import onReady from './init/onReady.js';
import onEmotion from './init/onEmotion.js';

/** --------------------- MODEL IMPORTS --------------------- */
import Game from '../models/game.js';

let games = [
    new Game(2)
];

export default function (io) {
    io.on('connection', function (socket) {
        console.log("connected " + socket.id)
        
        socket.on('init', function (game) {
            onInit(socket, games[game]);
        });

        socket.on('disconnect', function () {
            onDisconnect(socket, games);
        });

        socket.on('ready', function (sign) {
            console.log("ready");
            onReady(sign, games, socket);
        });

        socket.on('emotion', function (emotion) {
            onEmotion(games, emotion, socket);
        });

        socket.on('message', function (msg) {
            io.emit('message', msg);
        });
    });
}
