'use strict';

define(
    function () {
        const directions = [
            [-1, -1], [0, -1], [1, -1],
            [-1, 0], /* x */ [1, 0],
            [-1, 1], [0, 1], [1, 1]
        ];

        class Board {
            constructor(width, height, inhabitant) {
                this.width  = width;
                this.height = height;

                this.cells = Array.from(
                    {length: width * height},
                    (_, index) => Board.createCell(index, height, inhabitant)
                );
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
                return Math.floor(index / height);
            }

            getArea() {
                return this.cells;
            }

            getNeighbours(index) {
                const {x, y} = this.cells[index];

                const neighbours = directions.map(tuple => this.calculatePosition(tuple, x, y));

                return this.cells
                    .filter(
                        cell => ~neighbours.findIndex(neighbour => cell.x == neighbour[0] && cell.y == neighbour[1])
                    )
                    .map(cell => cell.denizen);
            }

            calculatePosition(tuple, x, y) {
                const newX = tuple[0] + x;
                const newY = tuple[1] + y;

                return [
                    newX > -1 ? newX < this.width ? newX : 0 : this.width - 1,
                    newY > -1 ? newY < this.height ? newY : 0 : this.height - 1
                ];
            }

            getDenizen(index) {
                return this.cells[index].denizen;
            }

            getSize() {
                return {
                    width:  this.width,
                    height: this.height
                };
            }
        }

        return ({width = 0, height = 0, inhabitant = 0} = {}) =>
            new Board(width, height, inhabitant);
    }
);
