export default class User {
    private uuid: string;
    private socket: any;
    private room: string;
    private isInGame: boolean;
    private deck: string[];
    private showDeck: string[];
    private emotions: string[];

    constructor(uuid: string, socket: any) {
        this.uuid = uuid;
        this.socket = socket;
        this.room = "";
        this.isInGame = false;
        this.deck = [];
        this.showDeck = [];
        this.emotions = [];
    }

    setDeck(deck: string[]) {
        this.deck = deck;
    }

    getDeck() {
        return this.deck;
    }

    setShowDeck(show: string[]) {
        this.showDeck = show;
    }

    getShowDeck() {
        return this.showDeck;
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

    setEmotion(emotion: string) {
        this.emotions.push(emotion);
        if (this.emotions.length > 3) {
            this.emotions.shift();
        }
    }

    getEmotions() {
        return this.emotions;
    }
}