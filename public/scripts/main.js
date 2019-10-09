const Phaser = require('phaser');
import createMap from "./map";
import CONSTANTS from "./constants";
import {initResults, postResult} from "./resultsManager";

let config = {
  type: Phaser.AUTO,
  width: CONSTANTS.WIDTH,
  height: CONSTANTS.HEIGHT,
  parent: "game-container",
  pixelArt: true,
  zoom: 1,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },

  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let game = new Phaser.Game(config);

/**
 * This handles getting the assets loaded in
 */
function preload() {
  this.load.image('tiles', 'assets/grass_tiles.png')
}

/**
 * This happens once everything is read
 */
function create() {
  // leave space for 2, 100px setup areas for either player
  const actualHeight = CONSTANTS.HEIGHT - CONSTANTS.SETUP_AREA_HEIGHT*2;
  const gameBoard = createMap(actualHeight, CONSTANTS.WIDTH, 2, CONSTANTS.TILE_SIZE);
  const map = this.make.tilemap({ data: gameBoard, tileWidth: CONSTANTS.TILE_SIZE,
    tileHeight: CONSTANTS.TILE_SIZE });
  const tiles = map.addTilesetImage("tiles");

  // leave space for the setup area height
  const layer = map.createStaticLayer(0, tiles, 0, CONSTANTS.SETUP_AREA_HEIGHT);

  // sets up the game results
  initResults();


}

/**
 * This is run each frame
 */
function update() {


}
