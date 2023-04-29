import User from "./user";

export default class Room {
    private room_id: string;
    private users: User[];
    private ready: number;

    constructor(room_id: string) {
        this.room_id = room_id;
        this.users = [];
        this.ready = 0;
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