export default function(deck: string[]) {
    // remove two cards if it has same number (e.g. S01, H01)
    for (let i = 0; i < deck.length; i++) {
        let card = deck[i];
        if (card === undefined) {
            console.log("card undefined : " + card + " " + deck + " " + i);
            continue
        }
        let cardNum = card.substring(1);
        for (let j = i + 1; j < deck.length; j++) {
            let card2 = deck[j];
            if (card2 === undefined) {
                console.log("card2 undefined : " + card + " " + deck + " " + i + " " + j);
                continue
            }
            let card2Num = card2.substring(1);
            if (cardNum === card2Num) {
                deck.splice(j, 1);
                deck.splice(i, 1);
                i--;
                break;
            }
        }
    }

    return deck;
}