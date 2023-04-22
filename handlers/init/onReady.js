export default function (sign, games, socket) {
    console.log(socket.id + " ready!")
    if (sign === 'ok') {
        let game = games.find((g) => g.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id)));
        let room = game.getRooms().find((r) => r.getUsers().find((u) => u.getUuid() === socket.id));
        room.setReady();

        console.log(room.getUsers().length + " 사용자 수")
        console.log(room.getReady() + " 준비된 사용자 수")

        if (room.getReady() === room.getUsers().length) {
            console.log("all user ready!")
            room.getUsers().forEach((user) => {
                user.getSocket().emit('ready', 'ok');
            });
        }
    }
}