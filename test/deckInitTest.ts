import initializeDeck from "../functions/joker/initializeDeck";

let Deck: string[][] = initializeDeck(4);

console.log(Deck);

// check if duplicated cards exist
let check: string[] = [];
for (let i = 0; i < Deck.length; i++) {
    for (let j = 0; j < Deck[i].length; j++) {
        if (check.includes(Deck[i][j])) {
            console.log("duplicated card exists");
            console.log(Deck[i][j]);
        }
        check.push(Deck[i][j]);
    }
}

// check if joker exists
let jokerExists: boolean = false;
for (let i = 0; i < Deck.length; i++) {
    for (let j = 0; j < Deck[i].length; j++) {
        if (Deck[i][j] === "joker") {
            jokerExists = true;
            console.log("joker exists in deck " + i);
        }
    }
}

if (!jokerExists) {
    console.log("joker does not exist");
}
