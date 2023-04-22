export default function (socket, games) {
    console.log("disconnected " + socket.id)
    // if user is in game, run this
    let game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)));
    if (game) {
        let room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id));
        let chicken = room.getUsers().find((u) => u.getUuid() === socket.id);
        if (chicken) {
            room.getUsers().filter((user) => user.getUuid() !== socket.id);
        }
        console.log('user disconnected');

        // if user is in a room, notify the other user
        if (chicken.getRoom()) {
            let opponents = room.getOpponents(chicken);
            if (opponents.length > 0) {
                for (let opponent of opponents) {
                    opponent.getSocket().emit('message', 'He was a good chicken.');
                    opponent.setRoom(null);
                }
            }
            games = games.filter((g) => g.getRooms().find((r) => r.getRoomId() !== room.getRoomId()));
        }
    }
}