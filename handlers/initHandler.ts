import onInit from './init/onInit';
import onReady from './init/onReady';
import onEmotion from './init/onEmotion';
import Game from '../models/game';

import errorHandler from './errorHandler';

export default function (socket: any, games: Game[]) {
    socket.on('init', function (game: number) {
        if (games[game] === undefined) {
            errorHandler(1, socket);
            return;
        }
        onInit(socket, games[game]);
    });

    socket.on('ready', function (sign: string) {
        console.log("ready");
        onReady(sign, games, socket);
    });

    socket.on('emotion', function (emotion: string) {
        onEmotion(games, emotion, socket);
    });
}