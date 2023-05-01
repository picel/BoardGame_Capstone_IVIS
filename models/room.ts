import User from "./user";

export default class Room {
    private room_id: string;
    private users: User[];
    private ready: number;
    private turn: number;

    constructor(room_id: string) {
        this.room_id = room_id;
        this.users = [];
        this.ready = 0;
        this.turn = 0;
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
        return this.ready;
    }

    setReady() {
        this.ready++;
    }
}