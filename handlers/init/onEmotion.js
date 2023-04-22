export default function (games, emotion, socket) {
    let game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)));
    let room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id));
    let opponents = room.getOpponents(socket.id);

    console.log(socket.id + " : " + emotion);

    opponents.forEach((opponent) => {
        opponent.getSocket().emit('emotion', emotion);
    });
}