class GameManager {
  static _instance = null;
  _playerOnePieces;
  _playerTwoPieces;


  /**
   * initializes everything to null, is only invoked by create instance
   */
  constructor() {
    this._playerOnePieces = [];
    this._playerTwoPieces = [];
  }

  /**
   * @return {Array}
   */
  getPlayerOneTeam(){
    //return player one's team currently
    return []
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