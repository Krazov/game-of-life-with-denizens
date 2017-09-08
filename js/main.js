'use strict';

require.config({
    paths: {
        tools:     '/js/Utils/tools',
        constants: '/js/Configs/constants',
        status:    '/js/Components/createGameStatus',
        denizen:   '/js/Components/createDenizen',
        board:     '/js/Components/createBoard',
        renderer:  '/js/Components/createBoardRenderer'
    }
});

require(
    [
        'status', 'board', 'denizen', 'renderer',
        'tools', 'constants'
    ],
    function (createStatus, createBoard, createDenizen, createRenderer,
              tools, constants) {
        const {log} = tools;

        const {STATUS_CHANGED, TICK_LENGTH} = constants;

        log('hello');

        let tickId = 0;

        const [WIDTH, HEIGHT] = [15, 15];

        const gameStatus = createStatus();

        const board = createBoard({
            width:  WIDTH,
            height: HEIGHT,

            inhabitant: createDenizen
        });

        const renderer = createRenderer({
            container: document.querySelector('.boardContainer'),
            width:     WIDTH,
            height:    HEIGHT
        });

        renderer.updateCells(board.getArea().map(cell => cell.denizen.getValue()));

        main();

        // help functions
        function main() {
            // board handler
            renderer.getCells().forEach((cell, index) => {
                cell.addEventListener('click', () => {
                    if (gameStatus.isActive()) {
                        log('game is running');

                        return;
                    }

                    const denizen = board.getDenizen(index);

                    renderer.updateCell(index, denizen.getValue() > 0 ? denizen.setDead() : denizen.setAlive());
                });
            });

            document.querySelector('.gameStart').addEventListener('click', () => {
                if (gameStatus.isActive()) {
                    return;
                }

                gameStatus.start(setTimeout(tick, TICK_LENGTH));
                log('game has been started');
            });

            document.querySelector('.gameStop').addEventListener('click', () => {
                if (!gameStatus.isActive()) {
                    return;
                }

                gameStatus.stop();
                log('game has been stopped');
            });

            window.addEventListener(STATUS_CHANGED, eventData => {
                log(eventData);
            });
        }

        function tick() {
            const area = board.getArea();

            // take a snapshot of current state
            const currentState = area.map(cell => cell.denizen.getValue()).join('');

            log('current state', currentState);

            // calculate new values
            const neighboursCount = area
                .map((_, index) => board.getNeighbours(index))
                .map(
                    neighbours => neighbours
                        .map(denizen => denizen.isAlive() ? 1 : 0)
                        .reduce((count, isAlive) => count + isAlive, 0)
                );

            area
                .map(cell => cell.denizen)
                .forEach((denizen, index) => {
                    denizen.update(neighboursCount[index]);
                });

            log('neighbours count', neighboursCount);

            // TODO: check if oscilator or dead
            // TODO:    if yes, then inform and continue (oscilator) or stop the game (dead)
            // TODO:    if no, then update board
            renderer.updateCells(area.map(cell => cell.denizen.getValue()));

            setTimeout(() => {
                if (gameStatus.isActive()) {
                    tickId = tick();
                }
            }, TICK_LENGTH);
        }
    }
);
