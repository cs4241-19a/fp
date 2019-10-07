// Declare myGame, the object that contains our game's states
const myGame = {
    width: 800,
    height: 600,
    //Define our game states
    scenes: [],

    // Define common framerate to be referenced in animations
    frameRate: 20
};

const cellSize = {width: 40, height: 40};
const btmLeft = {x: 0, y: (myGame.height / cellSize.height) - 1};  // the bottom left cell of the grid. where the base is
const grid = [];
(() => {
    for (let i = 0; i < myGame.height / cellSize.height; i++) {
        grid[i] = [];
        for (let j = 0; j < myGame.width / cellSize.width; j++) {
            grid[i][j] = 0;
        }
    }
    // game and cell size must allow base to fit in 2x2 cells in bottom left corner
    grid[btmLeft.y][btmLeft.x] = -1;
    grid[btmLeft.y][btmLeft.x + 1] = -1;
    grid[btmLeft.y - 1][btmLeft.x] = -1;
    grid[btmLeft.y - 1][btmLeft.x + 1] = -1;
})();
console.log(grid);