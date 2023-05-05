import Room from "./room";
import timeOutEvent from "../controllers/joker/timeOutEvent";

export default class Timer {
    private timer: number;
    private interval: any;

    constructor() {
        this.timer = 0;
        this.interval = null;
    }

    getTimer() {
        return this.timer;
    }

    startTimer(room: Room) {
        this.timer = 0;
        this.interval = setInterval(() => {
            this.timer++;
            console.log("timer : " + this.timer);

            if (this.timer === 22) {
                this.stopTimer();
                timeOutEvent(room);
            }
        }, 1000);
    }

    stopTimer() {
        this.timer = 0;
        clearInterval(this.interval);
    }
}