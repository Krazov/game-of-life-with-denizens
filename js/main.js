'use strict';

require.config({
    paths: {
        tools:     '/js/Utils/tools',
        constants: '/js/Configs/constants',
        status:    '/js/Components/createGameStatus',
        denizen:      '/js/Components/createDenizen',
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

        const [WIDTH, HEIGHT] = [10, 10];

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
                    if (gameStatus.getStatus()) {
                        log('game is running');

                        return;
                    }

                    const denizen = board.getDenizen(index);

                    renderer.updateCell(index, denizen.getValue() > 0 ? denizen.setDead() : denizen.setAlive());
                });
            });

            document.querySelector('.gameStart').addEventListener('click', () => {
                if (gameStatus.getStatus()) {
                    return;
                }

                gameStatus.start(setTimeout(tick, TICK_LENGTH));
                log('game has been started');
            });

            document.querySelector('.gameStop').addEventListener('click', () => {
                if (!gameStatus.getStatus()) {
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
            const currentState = board.getArea().map(cell => cell.dweller.getValue());

            // TODO: calculate new values
            // TODO: check if oscilator or dead
            // TODO:    if yes, then inform and continue (oscilator) or stop the game (dead)
            // TODO:    if no, then update board
        }
    }
);
