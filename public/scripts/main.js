const Phaser = require('phaser');
const Setup = require('./setup_helper/setupHelper');
import GameManager from "./gameManager";
import createMap from "./map";
import CONSTANTS from "./constants";


const gameManager = GameManager.getInstance();

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
      gravity: {y: 0},
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
  this.load.image('tiles', 'assets/grass_tiles.png');
  this.load.image('blue', 'assets/characters/blue_guy.png');
  this.load.image('orange', 'assets/characters/orange_guy.png');
  this.load.image('purple', 'assets/characters/purple_guy.png');
  this.load.image('red', 'assets/characters/red_guy.png');
  this.load.image('yellow', 'assets/characters/yellow_guy.png');
  this.load.image(CONSTANTS.PLACEMENT_TEXTURE, 'assets/placement_spot.png');
}

/**
 * This happens once everything is read
 */
function create() {
  // leave space for 2, 100px setup areas for either player
  const actualHeight = CONSTANTS.HEIGHT - CONSTANTS.SETUP_AREA_HEIGHT * 2;
  const gameBoard = createMap(actualHeight, CONSTANTS.WIDTH, 2, CONSTANTS.TILE_SIZE);
  const map = this.make.tilemap({
    data: gameBoard, tileWidth: CONSTANTS.TILE_SIZE,
    tileHeight: CONSTANTS.TILE_SIZE
  });
  const tiles = map.addTilesetImage("tiles");

  // leave space for the setup area height
  const layer = map.createStaticLayer(0, tiles, 0, CONSTANTS.SETUP_AREA_HEIGHT);

  //initialize the groups for player1, player2 and buy area.
  gameManager.buyList = this.physics.add.group();
  gameManager.p1Pieces = this.physics.add.group();
  gameManager.p2Pieces = this.physics.add.group();
  // initalize the setup state resources
  gameManager.p1Placement = this.physics.add.group();
  gameManager.p2Placement = this.physics.add.group();

  // create the initial text resource counters in the corners
  gameManager.playerOneResourceText = this.add.text(16, 16,
      `resources: ${gameManager.playerOneResources}`, {fontSize: '32px', fill: '#fff'});
  // align this 16px from the bottom margin
  gameManager.playerTwoResourceText = this.add.text(16, CONSTANTS.HEIGHT - 32 - 16,
      `resources: ${gameManager.playerOneResources}`, {fontSize: '32px', fill: '#fff'});

  //set up the space key for transitions, then initialize the buy list for the first part of the game
  gameManager.stateTransitionKey = this.input.keyboard.addKey('SPACE');  // Get key object
  gameManager.confirmKey = this.input.keyboard.addKey('y');
  gameManager.initBuyList(CONSTANTS.P1, this);
}

// if the space key has been pressed, return true otherwise return false.
function changeState(scene) {
  return (Phaser.Input.Keyboard.JustDown(gameManager.stateTransitionKey));
}

/**
 * This is run each frame
 */
function update() {
  // buy state
  if (gameManager.state === CONSTANTS.STATES.buy) {
    if (gameManager.turn === CONSTANTS.TURN.p1) {
      // if the user presses the space key, change who's buying
      if (changeState(this)) {
        gameManager.initBuyList(CONSTANTS.P2, this);
        gameManager.turn = CONSTANTS.TURN.p2;
        console.log('changing turns');
      }
    }
    if (gameManager.turn === CONSTANTS.TURN.p2) {
      if (changeState(this)) {
        gameManager.state = CONSTANTS.STATES.setup;
        gameManager.turn = CONSTANTS.TURN.p1;
        gameManager.clearBuyList();
        // create the areas for the current player to add their pieces (as just a gameObject)
        Setup.populateSetupSquares(this);
        // this makes player one's pieces and placement areas clickable
        Setup.makeClickable(CONSTANTS.P1);
        // when they click an area, remove it from the area list
        // when you press y, it changes to the next person's setup turn
        // once both players press space, the fight starts
      }
    }
  }
  // setup state
  if (gameManager.state === CONSTANTS.STATES.setup) {
    if (gameManager.turn === CONSTANTS.TURN.p1) {

    }
    if (gameManager.turn === CONSTANTS.TURN.p2) {

    }
  }
}
