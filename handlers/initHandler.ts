import onInit from './init/onInit';
import onDisconnect from './init/onDisconnect';
import onReady from './init/onReady';
import onEmotion from './init/onEmotion';
import Game from '../models/game';

export default function (socket: any, games: Game[]) {
    socket.on('init', function (game: number) {
        onInit(socket, games[game]);
    });

    socket.on('disconnect', function () {
        onDisconnect(socket, games);
    });

    socket.on('ready', function (sign: string) {
        console.log("ready");
        onReady(sign, games, socket);
    });

    socket.on('emotion', function (emotion: string) {
        onEmotion(games, emotion, socket);
    });
}