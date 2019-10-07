import CONSTANTS from "./constants";
import getRandomInt from "./utility/random";

class GameManager {
  static _instance = null;
  characterNames = ['blue', 'orange', 'purple', 'red', 'yellow'];
  playerOnePieces;
  playerTwoPieces;
  buyList;
  state; stateTransitionKey;
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
    this.buyList = [];
    this.state = CONSTANTS.STATES.buy;
    this.playerOneResources = this.playerTwoResources = CONSTANTS.INIT_RESOURCES;
    this.turn = CONSTANTS.TURN.p1;
  }

  /**
   * destroys all objects in the buylist, then repopulates them and
   * adds listeners that add them to the desired picelist when clicked
   * @param pieceList the phaser group to put the pieces in when bought
   * @param scene the scene to add the sprites to.
   */
  initBuyList(pieceList, scene) {
    //get rid off all children in the build list (just in case)
    this.clearBuyList();
    //put all of the characters into the list
    this._populateBuyList(scene);
    // the game starts on player1's buy turn so we will have it add the child to that player's pieces
    // then remove the object from the scene
    this.buyList.getChildren().forEach((child)=>{
      child.setInteractive().on('pointerup', function(pointer, localX, localY, event){
        pieceList.add(child);
        console.log('added child!!');
        child.destroy();
      })
    })
  }

  clearBuyList(){
    this.buyList.getChildren().forEach((child)=>{
      child.destroy();
      console.log('removing character');
    });
    this.buyList.clear(true);
  }

  _populateBuyList(scene){
    // pick 3 random characters and center them across the screen for the player to click and purchase
    let x = CONSTANTS.WIDTH/4;
    let that = this;
    for (let i = 0; i < 3; i++) {
      //how do we inject the state object into this?
      let character = scene.physics.add.sprite(x,
          CONSTANTS.HEIGHT/2, this.characterNames[getRandomInt(this.characterNames.length)]);
      // set a health and strength for the character
      character.setData({ health: 100, strength: 12});
      this.buyList.add(character);
      x += 100; //this is an arbitrary length based off the size of the character
    }
  }

  addCharacterToPlayer(player, character) {

  }

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