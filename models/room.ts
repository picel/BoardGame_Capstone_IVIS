import Timer from "./timer";
import User from "./user";

export default class Room {
    private room_id: string;
    private users: User[];
    private ready: Set<string>;
    private turn: number;
    private timer: Timer;

    constructor(room_id: string) {
        this.room_id = room_id;
        this.users = [];
        this.ready = new Set();
        this.turn = 0;
        this.timer = new Timer();
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