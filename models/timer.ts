import Room from "./room";
import timeOutEvent from "../controllers/timeOutEvent";

export default class Timer {
    private timer: number;
    private interval: any;
    private isActivated: boolean;

    constructor() {
        this.timer = 0;
        this.interval = null;
        this.isActivated = false;
    }

    getTimer() {
        return this.timer;
    }

    startTimer(room: Room, time: number) {
        this.timer = 0;
        this.isActivated = true;
        this.interval = setInterval(() => {
            this.timer++;
            console.log("timer : " + this.timer);

            if (this.timer === time) {
                this.stopTimer();
                timeOutEvent(room);
            }
        }, 1000);
    }

    stopTimer() {
        this.timer = 0;
        this.isActivated = false;
        clearInterval(this.interval);
    }

    isTimerActivated() {
        return this.isActivated;
    }
}