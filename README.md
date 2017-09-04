# Game of Life: With Denizens

## What and why

Another approach (after last year’s [successful implementation](https://github.com/Krazov/game-of-life)) at Conway’s Game of Life. The difference this time is the cells are not primitive numbers but objects holding its state (called Denizens). Another difference is non-binary population, though how it goes, we’ll see.

## Game

### What

>**The Game of Life**, also known simply as **Life**, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
>
>The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced "players", by creating patterns with particular properties.

### How

>The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square _cells_, each of which is in one of two possible states, _alive_ or _dead_, or "populated" or "unpopulated" (the difference may seem minor, except when viewing it as an early model of human/urban behavior simulation or how one views a blank space on a grid). Every cell interacts with its eight _neighbours_, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:
>
>1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
>2. Any live cell with two or three live neighbours lives on to the next generation.
>3. Any live cell with more than three live neighbours dies, as if by over-population.
>4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
>
>The initial pattern constitutes the _seed_ of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a _tick_ (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.

(Source: [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).)
