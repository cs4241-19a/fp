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
    TOWER: 1,
};



const cellSize = {width: 40, height: 40};
const playArea = {width: myGame.width, height: myGame.height - cellSize.height};
const enemyEnterCoord = {x: (playArea.width / cellSize.width) - 1, y: 1};
const btmLeft = {x: 0, y: (playArea.height / cellSize.height) - 1};  // the bottom left cell of the grid. where the base is
const baseEntrance = {x: btmLeft.x + 1, y: btmLeft.y};

const grid = [];
(() => {
    for (let i = 0; i < playArea.height / cellSize.height; i++) {
        grid[i] = [];
        for (let j = 0; j < playArea.width / cellSize.width; j++) {
            if (i === 0 || j === 0 || i === (playArea.height / cellSize.height) - 1 || (i !== enemyEnterCoord.y && j === (playArea.width / cellSize.width) - 1)) {
                // add WALLs to top, bottom, left, and right. Except the second one down on the right
                grid[i][j] = cellTypes.WALL;
            } else {
                grid[i][j] = cellTypes.OPEN;
            }
        }
    }
    // game and cell size must allow base to fit in 2x2 cells in bottom left corner
    // overrides some WALLs
    grid[btmLeft.y][btmLeft.x] = cellTypes.BASE;
    grid[btmLeft.y][btmLeft.x + 1] = cellTypes.BASE;
    grid[btmLeft.y - 1][btmLeft.x] = cellTypes.BASE;
    grid[btmLeft.y - 1][btmLeft.x + 1] = cellTypes.BASE;

    // test pathfinding
    grid[1][15] = cellTypes.WALL;
    grid[2][15] = cellTypes.WALL;
    grid[3][15] = cellTypes.WALL;
    grid[4][15] = cellTypes.WALL;
    grid[5][15] = cellTypes.WALL;
    grid[6][15] = cellTypes.WALL;

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
    pathPoints.x.push(startCoord.x + 1, startCoord.x);
    pathPoints.y.push(startCoord.y, startCoord.y);
    getPath(startCoord).forEach(node => {
        // x and y are switched in grid
        pathPoints.x.push(node.y);
        pathPoints.y.push(node.x);
    });
    return pathPoints
}