import Room from './room';
import User from './user';

export default class Game {
    private code: number;
    private limit: number;
    private waiting_queue: User[];
    private rooms: Room[];

    constructor(code: number, limit: number) {
        this.code = code;
        this.limit = limit;
        this.waiting_queue = [];
        this.rooms = [];
    }

    getCode() {
        return this.code;
    }

    getLimit() {
        return this.limit;
    }

    getWaitingQueue() {
        return this.waiting_queue;
    }

    getRooms() {
        return this.rooms;
    }

    popWaitingQueue() {
        let result: User[] = [];
        for (let i = 0; i < this.limit; i++) {
            result.push(this.waiting_queue.shift() as User);
        }
        return result;
    }
}