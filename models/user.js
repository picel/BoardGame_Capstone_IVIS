export default class User {
    constructor(uuid, socket) {
        this.uuid = uuid;
        this.socket = socket;
        this.room = null;

        this.setRoom = function (room) {
            this.room = room;
        };

        this.getRoom = function () {
            return this.room;
        };

        this.getSocket = function () {
            return this.socket;
        };

        this.getUuid = function () {
            return this.uuid;
        };
    }
}