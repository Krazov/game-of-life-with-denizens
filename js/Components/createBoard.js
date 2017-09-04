'use strict';

define(
    function () {
        class Board {
            constructor(width, height, inhabitant) {
                this.width = width;
                this.height = height;

                this.cells = Array.from(
                    {length: width * height},
                    (_, index) => Board.createCell(index, height, inhabitant)
                );
            }

            getArea() {
                return this.cells;
            }

            getNeighbours() {
            }

            getDenizen(index) {
                return this.cells[index].denizen;
            }

            getSize() {
                return {
                    width: this.width,
                    height: this.height
                };
            }

            static createCell(index, height, inhabitant) {
                return {
                    x: Board.calculateX(index, height),
                    y: Board.calculateY(index, height),

                    denizen: typeof inhabitant == 'function' ? inhabitant() : inhabitant
                };
            }

            static calculateX(index, height) {
                return (index + 1) % height;
            }

            static calculateY(index, height) {
                return (index / height).toFixed();
            }
        }

        return ({width = 0, height = 0, inhabitant = 0} = {}) =>
            new Board(width, height, inhabitant);
    }
);
