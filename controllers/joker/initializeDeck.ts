export default function (player: number) {
    let deck: string[] = [];

    // add 52 cards
    for (let j = 1; j <= 13; j++) {
        let jString: string = j.toString();
        if (j < 10) {
            jString = "0" + jString;
        }
        deck.push("S" + jString);
        deck.push("H" + jString);
        deck.push("C" + jString);
        deck.push("D" + jString);
    }

    deck.push("joker");

    // shuffle deck
    deck.sort(() => Math.random() - 0.5);
    
    let decks: string[][] = [];
    for (let i = 0; i < player; i++) {
        decks.push([]);
    }
    for (let i = 0; i < deck.length; i++) {
        decks[i % player].push(deck[i]);
    }

    return decks;
}