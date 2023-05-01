export default class User {
    private uuid: string;
    private socket: any;
    private room: string;
    private isInGame: boolean;
    private deck: string[];

    constructor(uuid: string, socket: any) {
        this.uuid = uuid;
        this.socket = socket;
        this.room = "";
        this.isInGame = false;
        this.deck = [];
    }

    setDeck(deck: string[]) {
        this.deck = deck;
    }

    getDeck() {
        return this.deck;
    }

    setRoom(room: string) {
        this.room = room;
    }

    getRoom() {
        return this.room;
    }

    setInGame(val: boolean) {
        this.isInGame = val;
    }

    getInGame() {
        return this.isInGame;
    }

    getSocket() {
        return this.socket;
    }

    getUuid() {
        return this.uuid;
    }
}