export default function (error: number, socket: any) {
    switch (error) {
        case 0: /** @description: data is not valid */
            // send error message to client, then disconnect
            socket.emit('error', {
                status: 400,
                message: "data is not valid"
            });
        case 1: /** @description: game is undefined */
            // send error message to client, then disconnect
            socket.emit('error', {
                status: 400,
                message: "game is undefined"
            });
        case 2: /** @description: room is undefined */
            socket.emit('error', {
                status: 400,
                message: "room is undefined"
            });
        case 3: /** @description: user is undefined */
            socket.emit('error', {
                status: 400,
                message: "user is undefined"
            });
    }
}