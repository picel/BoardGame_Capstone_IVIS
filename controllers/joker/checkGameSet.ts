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
            socket.emit('result', result);
            console.log(socket.id, " ", result);
            cnt += 1;
        } 
    }

    if (cnt === userLen) {
        return true;
    } else {
        return false;
    }
}