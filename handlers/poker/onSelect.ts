import User from "../../models/user";

export default function (index: number, select: boolean, answer: string,  defender: User, attacker: User) {
    let card: string = defender.getDeck()[index];
    defender.setDeck(defender.getDeck().filter((c) => c !== card));

    let truth: boolean = card[0] === answer;

    let attackerShowDeck: string[] = attacker.getShowDeck();
    let defenderShowDeck: string[] = defender.getShowDeck();

    if (truth === select) {
        defenderShowDeck.push(card);
    } else {
        attackerShowDeck.push(card);
    }

    return
}