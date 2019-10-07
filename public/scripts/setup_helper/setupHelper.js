import CONSTANTS from "../constants";
import GameManager from "../gameManager";


const playerOneSetupLocs = [
    [CONSTANTS.WIDTH/4, CONSTANTS.SETUP_AREA_HEIGHT+CONSTANTS.SPRITE_SIZE],
    [CONSTANTS.WIDTH/2, CONSTANTS.SETUP_AREA_HEIGHT+CONSTANTS.SPRITE_SIZE*2],
    [CONSTANTS.WIDTH * 3/4, CONSTANTS.SETUP_AREA_HEIGHT+CONSTANTS.SPRITE_SIZE]
];

const playerTwoSetupLocs = [
    [CONSTANTS.WIDTH/4, CONSTANTS.HEIGHT - CONSTANTS.SETUP_AREA_HEIGHT - CONSTANTS.SPRITE_SIZE],
    [CONSTANTS.WIDTH/2, CONSTANTS.HEIGHT - CONSTANTS.SETUP_AREA_HEIGHT - CONSTANTS.SPRITE_SIZE*2],
    [CONSTANTS.WIDTH * 3/4, CONSTANTS.HEIGHT - CONSTANTS.SETUP_AREA_HEIGHT - CONSTANTS.SPRITE_SIZE]
];

const createPlacementLocs = function(scene, locs){
    const gameManager = GameManager.getInstance();
    for(let i =0; i<locs.length; i++){
        let setupSquare = scene.physics.add.sprite(locs[i][0], locs[i][1], CONSTANTS.PLACEMENT_TEXTURE);
        gameManager.p1Placement.add(setupSquare);
        console.log(`adding at ${locs[i][0]}, ${locs[i][1]}`)
    }
};

/**
 * Adds the interactive squares, and listens for a user to place a character
 * @param {number} player the player to create the squares for
 * @param scene the scene to add the setup squres to (should be this from main)
 */
exports.populateSetupSquares = function(scene){
    createPlacementLocs(scene, playerOneSetupLocs);
    createPlacementLocs(scene, playerTwoSetupLocs);
};

