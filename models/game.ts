import Room from './room';
import User from './user';

export default class Game {
    private limit: number;
    private waiting_queue: User[];
    private rooms: Room[];

    constructor(limit: number) {
        this.limit = limit;
        this.waiting_queue = [];
        this.rooms = [];
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