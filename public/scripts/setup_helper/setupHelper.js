import CONSTANTS from "../constants";
import GameManager from "../gameManager";


const playerOneSetupLocs = [
  [CONSTANTS.WIDTH / 4, CONSTANTS.SETUP_AREA_HEIGHT + CONSTANTS.SPRITE_SIZE],
  [CONSTANTS.WIDTH / 2, CONSTANTS.SETUP_AREA_HEIGHT + CONSTANTS.SPRITE_SIZE * 2],
  [CONSTANTS.WIDTH * 3 / 4, CONSTANTS.SETUP_AREA_HEIGHT + CONSTANTS.SPRITE_SIZE]
];

const playerTwoSetupLocs = [
  [CONSTANTS.WIDTH / 4, CONSTANTS.HEIGHT - CONSTANTS.SETUP_AREA_HEIGHT - CONSTANTS.SPRITE_SIZE],
  [CONSTANTS.WIDTH / 2, CONSTANTS.HEIGHT - CONSTANTS.SETUP_AREA_HEIGHT - CONSTANTS.SPRITE_SIZE * 2],
  [CONSTANTS.WIDTH * 3 / 4, CONSTANTS.HEIGHT - CONSTANTS.SETUP_AREA_HEIGHT - CONSTANTS.SPRITE_SIZE]
];

const createPlacementLocs = function (scene, locs, placement) {
  for (let i = 0; i < locs.length; i++) {
    let setupSquare = scene.physics.add.sprite(locs[i][0], locs[i][1], CONSTANTS.PLACEMENT_TEXTURE);
    placement.add(setupSquare);
  }
};

/**
 * Adds the interactive squares, and listens for a user to place a character
 * @param scene the scene to add the setup squres to (should be this from main)
 */
exports.populateSetupSquares = function (scene) {
  const gameManager = GameManager.getInstance();
  createPlacementLocs(scene, playerOneSetupLocs, gameManager.p1Placement);
  createPlacementLocs(scene, playerTwoSetupLocs, gameManager.p2Placement);
};

/**
 * Makes the specified player able to click on a piece, then click on a placement square
 * to put the piece on the board
 * @param {number} player the player to enable (also disables the other player
 */
exports.makeClickable = function (player) {
  const gameManager = GameManager.getInstance();
  let placementAreas = gameManager.p1Placement;
  let pieces = gameManager.p1Pieces;
  if (player === CONSTANTS.P2) {
    placementAreas = gameManager.p2Placement;
    pieces = gameManager.p2Pieces;
  }
  //init the active piece to null so you dont accidently add the other player's stuff
  gameManager.activePiece = null;
  pieces.getChildren().forEach((piece)=>{
    piece.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
      gameManager.activePiece = piece;
      this.setInteractive().removeAllListeners('pointerup');
    })
  });
  placementAreas.getChildren().forEach((area)=>{
    area.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
      if (gameManager.activePiece) {
        // add the piece and remove the area once it's been added
        gameManager.activePiece.setPosition(area.x, area.y);
        console.log(`moving active piece to ${area.x}, ${area.y}`);
        // becuase the areas can come back, we can just disable them and re-enable them
        area.destroy(true);
        // change the turn here
      }
    })
  })
};