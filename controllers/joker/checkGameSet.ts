import User from "../../models/user";

export default function (users : User[]) : boolean {
    let userLen: number = users.length;
    let cnt: number = 0;

    for (let i = 0; i < users.length; i++) {
        let result: number = 0;
        let deck: string[] = users[i].getDeck();

        if (deck.length === 0) {
            result = 1;
        } else if (deck.length === 1 && deck[0] == 'joker') {
            result = 2;
        }

        if (result !== 0) {
            let socket: any = users[i].getSocket();
            cnt += 1;
            if (socket === undefined) continue;
            socket.emit('result', result);
            console.log(socket.id, " ", result);
        } 
    }

    if (cnt === userLen) {
        return true;
    } else {
        return false;
    }
}