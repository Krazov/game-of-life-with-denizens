'use strict';

define(
    function () {
        const TABLE = 'table';
        const TR    = 'tr';
        const TD    = 'td';

        class Renderer {
            constructor(container, width, height) {
                this.container = container;

                this.width  = width;
                this.height = height;

                const table = Renderer.createBoard(this.width, this.height);

                // TODO: move this to main.js
                this.container.appendChild(table);

                this.cells = Renderer.extractCells(table);
            }

            getCells() {
                return this.cells;
            }

            updateCells(values) {
                this.cells.forEach((cell, index) => {
                    Renderer.update(cell, values[index]);
                });
            }

            updateCell(index, value) {
                Renderer.update(this.cells[index], value);
            }

            static update(cell, value) {
                cell.dataset.life = value;
                cell.innerHTML    = value;
            }

            static createBoard(width, height) {
                const table = document.createElement(TABLE);

                const tableCells = Array.from(
                    {length: width * height},
                    () => document.createElement(TD)
                );

                Array
                    .from(
                        {length: height},
                        (_, index) => {
                            const tr = document.createElement(TR);

                            tableCells
                                .slice(index * width, (index + 1) * width)
                                .forEach(tableCell => {
                                    tr.appendChild(tableCell);
                                });

                            return tr;
                        }
                    )
                    .forEach(tableRow => {
                        table.appendChild(tableRow);
                    });

                return table;
            }

            static extractCells(table) {
                return [].slice.call(table.getElementsByTagName(TD), 0);
            }
        }

        return ({container, width = 0, height = 0} = {}) =>
            new Renderer(container, width, height);
    }
);
