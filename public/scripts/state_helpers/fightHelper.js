import GameManager from "../gameManager";

let gameManager;
/**
 * This sets up the gameManager, and any other globals needed in this file
 */
exports.initFightHelper = function(){
  gameManager = GameManager.getInstance();
};

/**
 * deals damage to the enemy, then has them bounce off each other
 * @param piece the first attacking piece
 * @param enemy the second attacking piece
 */
exports.attack = function(piece, enemy) {
  piece.data.values.health -= enemy.data.values.strength;
  enemy.data.values.health -= enemy.data.values.strength;
  if (piece.data.values.health <= 0){
    piece.disableBody(true, true);
  }
  if (enemy.data.values.health <= 0){
    piece.disableBody(true, true);
  }
};

/**
 * This gets the enemy nearest to a piece
 * @param piece the piece to search from
 * @param enemyList the list to search through
 * @returns {Sprite}
 * @private
 */
function _getNearestEnemy(piece, enemyList) {

  let nearestRadius = Math.pow(enemyList.getChildren()[0].x - piece.x, 2) +
      Math.pow(enemyList.getChildren()[0].y - piece.y, 2);
  let nearestEnemy = enemyList.getChildren()[0];

  enemyList.getChildren().forEach((enemy) => {
    const curRadius = Math.pow(enemy.x - piece.x, 2) +
        Math.pow(enemy.y - piece.y, 2);

    if (curRadius < nearestRadius) {
      nearestRadius = curRadius;
      nearestEnemy = enemy;
    }
  });

  return nearestEnemy;
}

/**
 * This sets the velocity of the piece to chase the enemy
 * @param piece the piece that will chase
 * @param enemy the target of the piece
 * @private
 */
function _chaseEnemy(piece, enemy){
  const speed = piece.data.values.speed;
  const xOffset = enemy.x - piece.x;
  const yOffset = enemy.y - piece.y;
  const angle = Math.atan2(yOffset, xOffset);
  piece.setVelocity(speed * Math.cos(angle), speed*Math.sin(angle));
}

exports.fight = function(){
  // have both groups chase each other
  gameManager.p1FightPieces.getChildren().forEach((piece) => {
    const nearest = _getNearestEnemy(piece, gameManager.p2FightPieces);
    _chaseEnemy(piece, nearest);
  });
  gameManager.p2FightPieces.getChildren().forEach((piece) => {
    const nearest = _getNearestEnemy(piece, gameManager.p1FightPieces);
    _chaseEnemy(piece, nearest);
  })
};

function _resetPiece(fightPieces, pieces, piece){
  piece.enableBody(true, 0, 0, true, true);
  piece.setVelocity(0,0);
  piece.data.values.health = 100;
  pieces.add(piece);
}

/**
 * Update resource counts and reset character lists on end of fight
 */
exports.handleFightEnd = function(){
  let p1Lost = true;
  let p2Lost = true;
  gameManager.p1FightPieces.getChildren().forEach((piece) => {
    if(piece.data.values.health > 0){
      p1Lost = false;
    }
  });
  gameManager.p2FightPieces.getChildren().forEach((piece) => {
    if(piece.data.values.health > 0){
      p2Lost = false;
    }
  });
  // transfer resources from the winner to the loser
  if(p2Lost) {
    let resourceExchangeValue = gameManager.p1FightPieces.getChildren().length*3+3;
    gameManager.playerOneResources += resourceExchangeValue;
    gameManager.playerTwoResources -= resourceExchangeValue;
    console.log('player 2 lost');
  }
  else if (p1Lost) {
    let resourceExchangeValue = gameManager.p1FightPieces.getChildren().length*3+3;
    gameManager.playerTwoResources += resourceExchangeValue;
    gameManager.playerOneResources -= resourceExchangeValue;
    console.log('player 1 lost');
  }
  // move all the pieces back to their piece lists, reset the health
  // and remove them from the fight list
  if(p1Lost || p2Lost) {
    gameManager.playerOneResourceText.setText('Resources: ' + gameManager.playerOneResources);
    gameManager.playerTwoResourceText.setText('Resources: ' + gameManager.playerTwoResources);

    gameManager.p1FightPieces.children.iterate(function (piece) {
      _resetPiece(gameManager.p1FightPieces, gameManager.p1Pieces, piece);
    });
    gameManager.p1FightPieces.clear();

    gameManager.p2FightPieces.children.iterate(function(piece){
      _resetPiece(gameManager.p2FightPieces, gameManager.p2Pieces, piece);
    });
    gameManager.p2FightPieces.clear();
    console.log('added back to p2:'+gameManager.p2Pieces.getChildren().length);
    console.log('added back to p1:'+gameManager.p1Pieces.getChildren().length);
    gameManager.populatePieceLists();
    return true;
  }
  return false;
};