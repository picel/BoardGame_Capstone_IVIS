import Timer from "./timer";
import User from "./user";

export default class Room {
    private room_id: string;
    private users: User[];
    private ready: Set<string>;
    private turn: number;
    private timer: Timer;
    private guessed: boolean;
    private answered: boolean;

    constructor(room_id: string) {
        this.room_id = room_id;
        this.users = [];
        this.ready = new Set();
        this.turn = 0;
        this.timer = new Timer();
        this.guessed = false;
        this.answered = false;
    }

    switchGuessed() {
        this.guessed = !this.guessed;
    }

    getGuessed() {
        return this.guessed;
    }

    switchAnswered() {
        this.answered = !this.answered;
    }

    getAnswered() {
        return this.answered;
    }

    nextTurn() {
        this.turn = (this.turn + 1) % this.users.length;
    }

    getTurn() {
        return this.turn;
    }

    getRoomId() {
        return this.room_id;
    }

    getUsers() {
        return this.users;
    }

    addUser(user: User) {
        this.users.push(user);
    }

    getOpponents(user: string) {
        return this.users.filter((u) => u.getUuid() !== user);
    }

    getReady() {
        return this.ready.size;
    }

    setReady(uuid: string) {
        this.ready.add(uuid);
    }

    getTimer() {
        return this.timer;
    }
}