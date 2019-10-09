// Declare myGame, the object that contains our game's states
const myGame = {
    width: 800,
    height: 600,
    //Define our game states
    scenes: [],

    // Define common framerate to be referenced in animations
    frameRate: 20
};

const cellTypes = {
    WALL: -2,  // this tile cannot be passed, have anything on it or be shot though
    BASE: -1,
    OPEN: 0,
    TOWER: 1,  // a placed tower
    MENU_SAND: 2,
    MENU_MG: 3,
    MENU_CANNON: 4,
};


let waveSpacingDur = 40;  // how many update cycles to wait until moving
const offScreenCoord = {x: -500, y: -500};

const cellSize = {width: 40, height: 40};
const playArea = {width: (myGame.width / cellSize.width), height: (myGame.height / cellSize.height) - 1};
const menuArea = {width: (myGame.width / cellSize.width), height: 1};
const enemyEnterCoord = {x: playArea.width, y: 1};  // is off playArea but grid has an empty cell here
const btmLeft = {x: 0, y: playArea.height + menuArea.height - menuArea.height - 1};  // the bottom left cell of the grid. where the base is
const baseEntrance = {x: btmLeft.x, y: btmLeft.y};

const grid = [];
(() => {
    for (let i = 0; i < playArea.height; i++) {
        grid[i] = [];
        for (let j = 0; j < playArea.width; j++) {
            if (i === 0 || j === 0 || i === playArea.height - 1 || (i !== enemyEnterCoord.y && j === playArea.width - 1)) {
                // add WALLs to top, bottom, left, and right. Except the second one down on the right
                grid[i][j] = cellTypes.WALL;
            } else {
                grid[i][j] = cellTypes.OPEN;
            }
        }
    }
    for (let i = playArea.height; i < playArea.height + menuArea.height; i++) {
        grid[i] = [];
        for (let j = 0; j < menuArea.width; j++) {
            if (j === 6) {
                grid[i][j] = cellTypes.MENU_SAND;
            } else if (j === 7) {
                grid[i][j] = cellTypes.MENU_MG;
            } else if (j === 8) {
                grid[i][j] = cellTypes.MENU_CANNON;
            } else {
                grid[i][j] = cellTypes.WALL;
            }
        }
    }
    // game and cell size must allow base to fit in 2x2 cells in bottom left corner
    // overrides some WALLs
    grid[btmLeft.y][btmLeft.x] = cellTypes.BASE;
    grid[btmLeft.y][btmLeft.x + 1] = cellTypes.BASE;
    grid[btmLeft.y - 1][btmLeft.x] = cellTypes.BASE;
    grid[btmLeft.y - 1][btmLeft.x + 1] = cellTypes.BASE;

    // add enemy buffer area
    grid[enemyEnterCoord.y][enemyEnterCoord.x] = cellTypes.OPEN;

    // // test pathfinding
    // grid[1][15] = cellTypes.WALL;
    // grid[2][14] = cellTypes.WALL;
    // grid[3][14] = cellTypes.WALL;
    // grid[4][14] = cellTypes.WALL;
    // grid[5][15] = cellTypes.WALL;
    // grid[6][15] = cellTypes.WALL;
    // grid[7][15] = cellTypes.WALL;
    // grid[8][15] = cellTypes.WALL;
    // grid[9][15] = cellTypes.WALL;
    // grid[10][15] = cellTypes.WALL;
    // grid[11][15] = cellTypes.WALL;
    // grid[12][15] = cellTypes.WALL;

})();
console.log(grid);

/**
 * return a weighted graph to be used in astar
 * @author: jk
 * @returns {[]}
 */
function getGraph() {
    const graph = [];
    for (let i = 0; i < grid.length; i++) {  // height
        graph[i] = [];
        for (let j = 0; j < grid[i].length; j++) {  // width
            switch (grid[i][j]) {
                case cellTypes.WALL:
                case cellTypes.TOWER:
                default: // all tower types
                    graph[i][j] = 0;  // impassible (infinity wight)
                    break;
                case cellTypes.OPEN:
                case cellTypes.BASE:
                    graph[i][j] = 1;
                    break;
            }
        }
    }
    return graph;
}

function getPath(startCoord) {
    const graphData = getGraph();
    console.log("graph data:", graphData, startCoord);
    const graph = new Graph(graphData, {diagonal: true});
    // x and y are switched in grid
    const start = graph.grid[startCoord.y][startCoord.x];
    const end = graph.grid[baseEntrance.y][baseEntrance.x];
    const path = astar.search(graph, start, end, {heuristic: astar.heuristics.diagonal});
    console.log("path:", path);
    return path;
}

function getPathPoints(startCoord) {
    const pathPoints = {x: [], y: []};
    // start off the screen and first go to the starting point
    pathPoints.x.push(startCoord.x);
    pathPoints.y.push(startCoord.y);
    getPath(startCoord).forEach(node => {
        // x and y are switched in grid
        pathPoints.x.push(node.y);
        pathPoints.y.push(node.x);
    });
    return pathPoints
}