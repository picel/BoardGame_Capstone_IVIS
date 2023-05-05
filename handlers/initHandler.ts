import onInit from './init/onInit';
import onReady from './init/onReady';
import onEmotion from './init/onEmotion';
import Game from '../models/game';

import exceptionHandler from './exceptionHandler';
import startHandler from './startHandler';

export default function (socket: any, games: Game[]) {
    let res: boolean = false;

    socket.on('init', function (game: number) {
        if (games[game] === undefined) {
            exceptionHandler(1, socket);
            return;
        }
        onInit(socket, games[game]);
    });

    socket.on('emotion', function (emotion: string) {
        onEmotion(games, emotion, socket);
    });

    socket.on('ready', function (sign: string) {
        console.log("ready");
        res = onReady(sign, games, socket);
        if (res) {
            startHandler(socket, games);
        }
    });
}