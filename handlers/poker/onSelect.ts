import User from "../../models/user";

export default function (index: number, symbol: string, defender: User, attacker: User) {
    if (defender.getSocket() !== undefined) {
        defender.getSocket().emit('poker_select', index);
    }

    let card: string = defender.getDeck()[index];
    defender.setDeck(defender.getDeck().filter((c) => c !== card));

    // if card's first character is same as symbol, add card to defender's show deck.
    if (card[0] === symbol) {
        defender.setShowDeck(defender.getShowDeck().concat(card));
    } else {
        attacker.setShowDeck(attacker.getShowDeck().concat(card));
    }

    return
}