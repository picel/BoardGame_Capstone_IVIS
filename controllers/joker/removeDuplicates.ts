export default function(deck: string[]) {
    // remove two cards if it has same number (e.g. S01, H01)
    for (let i = 0; i < deck.length; i++) {
        let card = deck[i];
        let cardNum = card.substring(1);
        for (let j = i + 1; j < deck.length; j++) {
            let card2 = deck[j];
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