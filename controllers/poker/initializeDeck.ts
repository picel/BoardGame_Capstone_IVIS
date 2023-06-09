export default function (player: number) {
    let deck: string[] = [];

    for (let j = 0; j <= 7; j++) {
        let jString: string = j.toString();
        deck.push("R" + jString);
        deck.push("K" + jString);
        deck.push("D" + jString);
        deck.push("E" + jString);
    }

    // shuffle deck
    deck.sort(() => Math.random() - 0.5);
    
    let decks: string[][] = [];

    for (let i = 0; i < player; i++) {
        decks.push([]);
    }
    for (let i = 0; i < deck.length; i++) {
        decks[i % player].push(deck[i]);
    }

    // limit deck size to 8
    for (let i = 0; i < decks.length; i++) {
        decks[i] = decks[i].slice(0, 8);
    }

    return decks;
}