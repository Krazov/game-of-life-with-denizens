'use strict';

define(function () {
    class GameStatus {
        constructor() {
            this.tickId  = 0;
            this.active  = false;
            this.history = [];
        }

        restart() {
            this.history = [];
            this.active  = true;
        }

        start(tickId) {
            if (this.active) {
                return;
            }

            // else
            this.tickId = tickId;
            this.active = true;
        }

        stop() {
            if (!this.active) {
                return;
            }

            // else
            clearTimeout(this.tickId);
            this.tickId = 0;
            this.active = false;
        }

        isActive() {
            return this.active;
        }

        nextRound(layout) {
            this.history = [layout].concat(this.history);
        }

        checkDynamic(current) {
            return !!this.history.filter(previous => previous == current).length;
        }
    }

    return () => new GameStatus();
});
