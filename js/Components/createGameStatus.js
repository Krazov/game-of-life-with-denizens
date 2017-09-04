'use strict';

define(function () {
    class GameStatus {
        constructor() {
            this.timeoutId = 0;
            this.active    = false;
            this.history   = [];
        }

        restart() {
            this.history = [];
            this.active  = true;
        }

        start() {
            this.active = true;
        }

        stop() {
            this.active = false;
        }

        getStatus() {
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