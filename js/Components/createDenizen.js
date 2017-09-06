'use strict';

define(
    function () {
        class Denizen {
            constructor() {
                this.life = 0;
            }

            getValue() {
                return this.life;
            }

            isAlive() {
                return !!this.life;
            }

            setAlive() {
                return Denizen.setLife(this, 1);
            }

            setDead() {
                return Denizen.setLife(this, 0);
            }

            increase() {
                return Denizen.setLife(this, this.life + 1);
            }

            decrease() {
                return Denizen.setLife(this, this.life > 0 ? this.life - 1 : 0);
            }

            static setLife(object, life) {
                return Object.assign(object, {life}).life;
            }

            static checkStatus(neighbours) {
                return neighbours == 3 ? true : neighbours == 2 ? null : false;
            }
        }

        return () => new Denizen();
    }
);
