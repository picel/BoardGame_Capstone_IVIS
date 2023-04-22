export default class Room {
    constructor(room_id) {
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

    addUser(user) {
        this.users.push(user);
    }

    getOpponents(user) {
        return this.users.filter((u) => u.getUuid() !== user);
    }

    getReady() {
        return this.ready;
    }

    setReady() {
        this.ready++;
    }
}