import GameManager from "../gameManager";
import CONSTANTS from "../constants";

const TEXT_SIZE = '15px';
const TEXT_OFFSET = CONSTANTS.SPRITE_SIZE/2;
const UI_COUNT = 20;
let gameManager;
exports.initHelper = function(scene) {
  gameManager = GameManager.getInstance();
  for (let i = 0; i<UI_COUNT; i++) {
    let uiText = scene.add.text(50, 50, 'text', {fontSize: TEXT_SIZE, fill: '#000'});
    //make the text always appear on top
    uiText.setDepth(100);
    gameManager.uiText.push(uiText);
  }
};

/**
 * Creates the UI text for the scene
 */
exports.paintText = function() {
  // place each of the text pieces over an element then move the rest off screen
  let textCount = 0;
  let text = gameManager.uiText;
  //make all the text invisible
  text.forEach((t)=>{t.visible = true});
  gameManager.buyList.children.iterate(function(child){
    createBuyText(text[textCount], child);
    textCount+=1;
  });
  gameManager.p1Pieces.children.iterate(function(child){
    createStatusText(text[textCount], child);
    textCount+=1;
  });
  gameManager.p2Pieces.children.iterate(function(child){
    createStatusText(text[textCount], child);
    textCount+=1;
  });
  gameManager.p1FightPieces.children.iterate(function(child){
    createStatusText(text[textCount], child);
    textCount+=1;
  });
  gameManager.p2FightPieces.children.iterate(function(child){
    createStatusText(text[textCount], child);
    textCount+=1;
  });

  hideRemaining(textCount);
};

const createStatusText = function(text, child){
  text.visible = child.active;
  text.setPosition(child.x-TEXT_OFFSET, child.y-TEXT_OFFSET);
  text.setText('str: '+child.data.values.strength+'\n' +
      'health:\n '+child.data.values.health);
};

const createBuyText = function (text, child) {
  text.visible = true;
  text.setPosition(child.x-TEXT_OFFSET, child.y-TEXT_OFFSET);
  text.setText('price: '+child.data.values.price+'\n' +
      'str: '+child.data.values.strength+'\n' +
      'health:\n '+child.data.values.health);
};

const hideRemaining = function(textCount){
  let text = gameManager.uiText;
  for (let i = textCount; i<UI_COUNT; i++){
    text[i].visible = false;
  }
};