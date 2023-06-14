import Timer from "./timer";
import User from "./user";

export default class Room {
    private room_id: string;
    private users: User[];
    private ready: Set<string>;
    private turn: number;
    private timer: Timer;
    private guess: string;
    private answer: string;

    constructor(room_id: string) {
        this.room_id = room_id;
        this.users = [];
        this.ready = new Set();
        this.turn = 0;
        this.timer = new Timer();
        this.guess = '';
        this.answer = '';
    }

    setAnswer(answer: string) {
        this.answer = answer;
    }

    setGuess(guess: string) {
        this.guess = guess;
    }

    getGuess() {
        return this.guess;
    }

    getAnswer() {
        return this.answer;
    }

    resetAnswernGuess() {
        this.answer = '';
        this.guess = '';
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