import { updateUser } from './networking';

const Constants = require('../shared/constants');

const canvas = document.getElementById('game-canvas');

let drive = 0; // 1 = forward, -1 = backward
let direction = 0; // in degrees
let shoot = 0; // 1 = shoot, 0 = don't shoot

const keyState = {};

function gameLoop() {
  var tf = document.getElementById('turn_number').value;
  var TF;
  switch(tf){
    case '100%':
      TF = 1;
      break;
    case '75%':
      TF = .75;
      break;
    case '125%':
      TF = 1.25;
      break;
    case '150%':
      TF = 1.5;
      break;
    case '50%':
      TF = .5;
      break;
    default:
      TF = 1;
      break;
  }
  
  if (keyState[37]) { // turn left
    if (keyState[38] || keyState[40]) { // turn while forward
      direction -= Constants.PLAYER_TURN_DEGREES*TF;
      if (direction < 0) { direction += 360; }
    } else {
      direction -= 1.8 * Constants.PLAYER_TURN_DEGREES*TF;
      if (direction < 0) { direction += 360; }
    }
  }

  if (keyState[39]) { // turn right
    if (keyState[38] || keyState[40]) { // turn while forward
      direction += Constants.PLAYER_TURN_DEGREES*TF;
      if (direction > 360) { direction -= 360; }
    } else {
      direction += 1.8 * Constants.PLAYER_TURN_DEGREES*TF;
      if (direction > 360) { direction -= 360; }
    }
  }

  if (keyState[38] || keyState[40]) { // drive
    if (keyState[38]) {
      drive = 1;
    } else {
      drive = -1;
    }
  } else {
    drive = 0;
  }

  if (keyState[32]) {		// do space function
    shoot = 1;
  } else {
    shoot = 0;
  }

  if (keyState[81]) {
    instructions();
  }

  handleInput({ direction: convertDirection(direction), drive, shoot });

  // redraw/reposition your object here
  // also redraw/animate any objects not controlled by the user

  setTimeout(gameLoop, 20);
}
gameLoop();

function handleInput(dir) {
  updateUser(dir);
}

function convertDirection(direction) {
  return direction * 3.1415 / 180;
}

function onKeyboardInputStart(e) {
  keyState[e.keyCode || e.which] = true;
}

function onKeyboardInputStop(e) {
  keyState[e.keyCode || e.which] = false;
}

export function startCapturingInput() {
  window.addEventListener('keydown', onKeyboardInputStart, true);
  window.addEventListener('keyup', onKeyboardInputStop, true);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onKeyboardInputStart);
  window.removeEventListener('keyup', onKeyboardInputStop);
}
