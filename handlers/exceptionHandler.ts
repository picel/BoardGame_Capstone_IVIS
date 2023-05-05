export default function (exception: number, socket: any) {
    switch (exception) {
        case 0: /** @description: data is not valid */
            // send exception message to client, then disconnect
            socket.emit('exception', "허용되지 않은 입력을 시도했습니다.");
        case 1: /** @description: game is undefined */
            // send exception message to client, then disconnect
            socket.emit('exception', "실행 중 오류가 발생했습니다.");
        case 2: /** @description: room is undefined */
            socket.emit('exception', "실행 중 오류가 발생했습니다.");
        case 3: /** @description: user is undefined */
        socket.emit('exception', "실행 중 오류가 발생했습니다.");
        case 10: /** @description: made an invalid input out of turn */
            socket.emit('exception', "부정행위 의심 동작이 감지되었습니다.");
    }
}