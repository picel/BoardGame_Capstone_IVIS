import User from "../../models/user";

export default function (users : User[]) : boolean {
    let loser: number = -1;
    
    for (let i = 0; i < users.length; i++) {
        let map: Map<string, number> = new Map();

        let showDeck: string[] = users[i].getShowDeck();

        for (let j = 0; j < showDeck.length; j++) {
            let card: string = showDeck[j][0];
            let num: number = 0;
            if (map.has(card)) {
                num = map.get(card)!;
            }
            map.set(card, num + 1);

            if (num + 1 === 3) {
                loser = i;
                break;
            }
        }
        if (loser !== -1) break;
    }
    
    if (loser !== -1) {
        for (let i = 0; i < users.length; i++) {
            let socket: any = users[i].getSocket();
            if (socket === undefined) continue;
            if (i === loser) {
                socket.emit('result', 2);
            } else {
                socket.emit('result', 1);
            }
        }
        return true;
    }

    let player1ShowDeck: string[] = users[0].getShowDeck();
    let player2ShowDeck: string[] = users[1].getShowDeck();
    let player1Deck: string[] = users[0].getDeck();
    let player2Deck: string[] = users[1].getDeck();

    if (player1Deck.length === 0 && player2Deck.length === 0) {
        if (player1ShowDeck.length > player2ShowDeck.length) {
            users[0].getSocket().emit('result', 2);
            users[1].getSocket().emit('result', 1);
        } else if (player1ShowDeck.length < player2ShowDeck.length) {
            users[0].getSocket().emit('result', 1);
            users[1].getSocket().emit('result', 2);
        } else {
            users[0].getSocket().emit('result', 4);
            users[1].getSocket().emit('result', 4);
        }
        return true;
    }

    return false;
}