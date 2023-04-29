import Room from "./room";

export default class User {
    private uuid: string;
    private socket: any;
    private room: string;

    constructor(uuid: string, socket: any) {
        this.uuid = uuid;
        this.socket = socket;
        this.room = "";
    }

    setRoom(room: string) {
        this.room = room;
    }

    getRoom() {
        return this.room;
    }

    getSocket() {
        return this.socket;
    }

    getUuid() {
        return this.uuid;
    }
}