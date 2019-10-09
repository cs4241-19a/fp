const Phaser = require('phaser');
const Setup = require('./state_helpers/setupHelper');
const Fight = require('./state_helpers/fightHelper');
const UIhelper = require('./state_helpers/uiHelper');

import GameManager from "./gameManager";
import createMap from "./map";
import CONSTANTS from "./constants";


let gameManager;

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
  console.log('starting game');
  gameManager = GameManager.resetInstance();
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
  // initalize the fight state resources
  gameManager.p1FightPieces = this.physics.add.group();
  gameManager.p2FightPieces = this.physics.add.group();
  // add the collider group for the fightPieces
  this.physics.add.collider(gameManager.p1FightPieces, gameManager.p2FightPieces, Fight.attack,
      null, this);
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
  UIhelper.initHelper(this);
}

// if the space key has been pressed, return true otherwise return false.
function changeState() {
  return (Phaser.Input.Keyboard.JustDown(gameManager.stateTransitionKey));
}

function confirm(){
  return Phaser.Input.Keyboard.JustDown(gameManager.confirmKey);
}

/**
 * This is run each frame
 */
function update() {
  // add UI text to buyList items, pieces & fight Pieces
  // buy state
  if (gameManager.state === CONSTANTS.STATES.buy) {
    if (gameManager.turn === CONSTANTS.TURN.p1) {
      // if the user presses the space key, change who's buying
      if (changeState()) {
        gameManager.initBuyList(CONSTANTS.P2, this);
        gameManager.turn = CONSTANTS.TURN.p2;
        console.log('changing turns');
      }
    }
    if (gameManager.turn === CONSTANTS.TURN.p2) {
      if (changeState()) {
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
    //change the state to fight once the players have placed their pieces
    if(gameManager.p1Ready && gameManager.p2Ready){
      Setup.removePlacement();
      gameManager.state = CONSTANTS.STATES.fight;
      Fight.initFightHelper();
      console.log('in fight state');
    }
    if (gameManager.turn === CONSTANTS.TURN.p1) {
      // each player can only put one piece each turn. Once they have placed it, they press space
      // to let the next player place their piece. Players press the y key once they are done setting up
      if (changeState()) {
        gameManager.turn = CONSTANTS.TURN.p2;
        Setup.makeClickable(CONSTANTS.P2);
        console.log('player1 has placed a piece');
      }
      if (confirm()){
        gameManager.p1Ready = true;
        gameManager.turn = CONSTANTS.TURN.p2;
        Setup.makeClickable(CONSTANTS.P2);
        console.log('player1 is done');
      }
    }
    if (gameManager.turn === CONSTANTS.TURN.p2) {
      if (changeState()) {
        gameManager.turn = CONSTANTS.TURN.p1;
        Setup.makeClickable(CONSTANTS.P1);
        console.log('player2 has placed a piece');
      }
      if (confirm()){
        gameManager.p2Ready = true;
        gameManager.turn = CONSTANTS.TURN.p1;
        Setup.makeClickable(CONSTANTS.P1);
        console.log('player2 is done');
      }
    }
  }

  if (gameManager.state === CONSTANTS.STATES.fight){
    // take all characters in the fight lists and have them run toward each other
    // once one list is empty calculate resource change
    // and return to buy state
    Fight.fight();
    if(Fight.handleFightEnd()){
      gameManager.initBuyList(CONSTANTS.P1, this);
      gameManager.state = CONSTANTS.STATES.buy;
      gameManager.turn = CONSTANTS.TURN.p1;
      gameManager.p1Ready = gameManager.p2Ready = false;
      if(gameManager.playerOneResources <= 0) {
        gameManager.state = CONSTANTS.STATES.gameOver;
        this.add.text(CONSTANTS.WIDTH/2 - 200, CONSTANTS.HEIGHT/2 - 200,
            `PLAYER 2 WINS\nRESTART WITH SPACE`, {fontSize: '32px', fill: '#000'});
      }
      if (gameManager.playerTwoResources <= 0) {
        gameManager.state = CONSTANTS.STATES.gameOver;
        this.add.text(CONSTANTS.WIDTH/2 - 200, CONSTANTS.HEIGHT/2 - 200,
            `PLAYER 1 WINS\nRESTART WITH SPACE`, {fontSize: '32px', fill: '#000'});
      }
    }
  }
  if(gameManager.state === CONSTANTS.STATES.gameOver) {
    if(changeState()) {
      this.scene.restart();
    }
  }
  UIhelper.paintText();

}
