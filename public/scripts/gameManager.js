import CONSTANTS from "./constants";
import getRandomInt from "./utility/random";

class GameManager {
  static _instance = null;
  characterNames = ['blue', 'orange', 'purple', 'red', 'yellow'];
  playerOnePieces;
  playerTwoPieces;
  // buy state objects
  buyList;
  // setup state objects
  p1Placement;
  p2Placement;
  activePiece;
  state; stateTransitionKey; confirmKey;
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
    this.p1Placement = null;
    this.p2Placement = null;
    this.activePiece = null;
  }

  /**
   * destroys all objects in the buylist, then repopulates them and
   * adds listeners that add them to the desired picelist when clicked
   * @param {number}player the player purchasing the characters
   * @param scene the scene to add the sprites to.
   */
  initBuyList(player, scene) {
    //get rid off all children in the build list (just in case)
    this.clearBuyList();
    //put all of the characters into the list
    this._populateBuyList(scene);
    // change which list is added to depending on the character adding stuff
    let pieceList = this.playerOnePieces;
    let resources = this.playerOneResources;
    let text = this.playerOneResourceText;
    if (player === CONSTANTS.P2){
      pieceList = this.playerTwoPieces;
      resources = this.playerTwoResources;
      text = this.playerTwoResourceText;
    }
    // the game starts on player1's buy turn so we will have it add the child to that player's pieces
    // then remove the object from the scene
    let that = this;
    this.buyList.getChildren().forEach((child)=>{
      child.setInteractive().on('pointerup', function(pointer, localX, localY, event){
        if (resources > child.data.values.price && pieceList.getChildren().length < CONSTANTS.MAX_PIECES) {
          pieceList.add(child);
          resources -= child.data.values.price;
          text.setText('Resources: ' + resources);
          console.log('added child!!');
          // remove the interactivity, then the child
          child.removeInteractive();
          that.buyList.remove(child);
          // get rid of the interactivity on the gameobject

          that.populatePieceLists();
        }
        else {
          console.log('cant afford or too many characters');
        }
      })
    })
  }

  populatePieceLists(){
    const p1YPos = CONSTANTS.SETUP_AREA_HEIGHT/2;
    const p2YPos = CONSTANTS.HEIGHT - CONSTANTS.SETUP_AREA_HEIGHT/2;
    const initXPos = CONSTANTS.WIDTH/2;
    let curXPos = initXPos;
    this.playerOnePieces.getChildren().forEach((child)=>{
      child.setPosition(curXPos, p1YPos);
      curXPos += CONSTANTS.SPRITE_SIZE+10;
    });
    curXPos = initXPos;
    this.playerTwoPieces.getChildren().forEach((child)=>{
      console.log(`adding piece to player 2 ${curXPos}, ${p2YPos}`);
      child.setPosition(curXPos, p2YPos);
      curXPos += CONSTANTS.SPRITE_SIZE+10;
    })
  }

  clearBuyList(){
    // remove the interactivity then clear the list
    this.buyList.getChildren().map((child) => {
      child.removeInteractive();
      console.log('removed child');
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
      // set a health and strength for the character. The price is how many resources it costs
      character.setData({ health: 100, strength: 12, price: 5});
      this.buyList.add(character);
      x += 100; //this is an arbitrary length based off the size of the character
    }
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