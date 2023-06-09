import User from "../../models/user";

export default function (index: number, defender: User, attacker: User) {
    if (defender.getSocket() !== undefined) {
        defender.getSocket().emit('select', index);
    }
    // remove card of index from defender's deck, and add it to attacker's deck
    let card: string = defender.getDeck()[index];
    defender.setDeck(defender.getDeck().filter((c) => c !== card));
    attacker.setDeck([...attacker.getDeck(), card]);
    return
}