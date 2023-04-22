export default class Game {
    constructor(limit) {
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
        let result = [];
        for (let i = 0; i < this.limit; i++) {
            result.push(this.waiting_queue.shift());
        }
        return result;
    }
}