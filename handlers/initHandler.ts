import onInit from './init/onInit';
import onReady from './init/onReady';
import onEmotion from './init/onEmotion';
import Game from '../models/game';

import errorHandler from './errorHandler';
import gameStarter from './gameStarter';

export default function (socket: any, games: Game[]) {
    let res: boolean = false;

    socket.on('init', function (game: number) {
        if (games[game] === undefined) {
            errorHandler(1, socket);
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
            gameStarter(socket, games);
        }
    });
}