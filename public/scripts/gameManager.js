import CONSTANTS from "./constants";
import getRandomInt from "./utility/random";

class GameManager {
  static _instance = null;
  characterNames = ['blue', 'orange', 'purple', 'red', 'yellow'];
  playerOnePieces;
  playerTwoPieces;
  buyGroup;
  state;
  //resources are used as health and currency, once they hit 0 the player loses
  playerOneResources;
  playerOneResourceText;
  playerTwoResources;
  playerTwoResourceText;
  turn;

  /**
   * Initialize the player resources, pieces and state
   */
  constructor() {
    this.playerOnePieces = [];
    this.playerTwoPieces = [];
    this.buyGroup = [];
    this.state = CONSTANTS.STATES.buy;
    this.playerOneResources = this.playerTwoResources = CONSTANTS.INIT_RESOURCES;
    this.turn = CONSTANTS.TURN.p1;
  }

  populateBuyList(){
    // pick 3 random characters and center them across the screen for the player to click and purchase
    let x = CONSTANTS.WIDTH/4;
    for (let i = 0; i < 3; i++) {
      //how do we inject the state object into this?
      this.buyGroup.create(x, CONSTANTS.HEIGHT/2, this.characterNames[getRandomInt(this.characterNames.length)]);
      x += 100; //this is an arbitrary length based off the size of the character
    }
  }

  addCharacterToPlayer(player, character)

  /**
   * creates the instance of the GameManager
   */
  static _createInstance() {
    GameManager._instance = new GameManager();
  }

  /**
   * Returns an instance to the current GameManager
   * @return {GameManager}
   */
  static getInstance() {
    if (!GameManager._instance) {
      GameManager._createInstance();
    }
    return GameManager._instance;
  }
}


export default GameManager;