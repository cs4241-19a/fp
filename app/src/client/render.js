import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';

const Constants = require('../shared/constants');

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE_X, MAP_SIZE_Y } = Constants;
var first = 1;

var SCALING_FACTOR = 1;
var SF = 100;
var sf;
var sf_old;

var TF = 1;
var tf;
var tf_old;
// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function setCanvasDimensions() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function render() {
  const { me, others, bullets, obstacles } = getCurrentState();
  sf = document.getElementById('scale_number').value
  tf = document.getElementById('turn_number').value

  switch(sf){
    case '100%':
      SCALING_FACTOR = 1;
      SF = 100;
      break;
    case '75%':
      SCALING_FACTOR = .75;
      SF = 75;
      break;
    case '125%':
      SCALING_FACTOR = 1.25;
      SF = 125;
      break;
    case '50%':
      SCALING_FACTOR = .5;
      SF = 50;
      break;
    default:
      SCALING_FACTOR = 1;
      SF = 100;
      break;
  }
  
  switch(tf){
    case '100%':
      TF = '100t';
      break;
    case '75%':
      TF = '75t';
      break;
    case '125%':
      TF = '125t';
      break;
    case '150%':
      TF = '150t';
      break;
    case '50%':
      TF = '50t';
      break;
    default:
      TF = '100t';
      break;
  }
  
  if(first === 1){
    first = 0;
  }
  else{
    if(sf_old != sf || tf_old != tf){    
      var myRequest = new Request('/update_scale', {
          method: 'POST', 
          body: JSON.stringify({ username:USERNAME, scale:SF, turnSpeed:TF}), 
          headers: { 'Content-Type': 'application/json' }
      });
      fetch(myRequest).then(function(response) {
        response.json().then(function(json_data) {
          console.log("updated scale")
        })
      })
      
    }
  }
  sf_old = sf;
  tf_old = tf;
  
  if (!me) {
    return;
  }

  // Draw background
  renderBackground();

  // Draw boundaries
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.strokeRect(canvas.width / 2 - MAP_SIZE_X*SCALING_FACTOR / 2, canvas.height / 2 - MAP_SIZE_Y*SCALING_FACTOR / 2, MAP_SIZE_X*SCALING_FACTOR, MAP_SIZE_Y*SCALING_FACTOR);

  // Draw objects on canvas
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));
  bullets.forEach(renderBullet.bind(null, me));
  obstacles.forEach(renderObstacle.bind(null, me));
}

function renderBackground() {
  const backgroundX = canvas.width / 2;
  const backgroundY = canvas.height / 2;
  const backgroundGradient = context.createRadialGradient(
    backgroundX,
    backgroundY,
    canvas.height / 2 / 10,
    backgroundX,
    backgroundY,
    canvas.height / 2,
  );
  backgroundGradient.addColorStop(0, 'blue');
  backgroundGradient.addColorStop(1, 'gray');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Renders a ship at the given coordinates
function renderPlayer(me, player) {
    const { x, y, direction, image, map_number } = player;
  if(me.map_number == map_number){
    const canvasX = x*SCALING_FACTOR + (canvas.width / 2 - MAP_SIZE_X*SCALING_FACTOR / 2); // canvas.width / 2 ;//+ x; - me.x;
    const canvasY = y*SCALING_FACTOR + (canvas.height / 2 - MAP_SIZE_Y*SCALING_FACTOR / 2); // canvas.height / 2;//+ y; - me.y;
    updateHealth(me.hp);

    // Draw ship
    context.save();
    context.translate(canvasX, canvasY);

    context.rotate(direction);
    context.drawImage(
      getAsset(image),
      -PLAYER_RADIUS*SCALING_FACTOR,
      -PLAYER_RADIUS*SCALING_FACTOR,
      PLAYER_RADIUS * 2*SCALING_FACTOR,
      PLAYER_RADIUS * 2*SCALING_FACTOR,
    );
    context.restore();

    // Draw health bar
    context.fillStyle = 'white';
    context.fillRect(
      canvasX - PLAYER_RADIUS*SCALING_FACTOR,
      canvasY + PLAYER_RADIUS*SCALING_FACTOR + 8,
      PLAYER_RADIUS*SCALING_FACTOR * 2,
      2,
    );
    context.fillStyle = 'red';
    context.fillRect(
      canvasX - PLAYER_RADIUS*SCALING_FACTOR + PLAYER_RADIUS*SCALING_FACTOR * 2 * player.hp / PLAYER_MAX_HP,
      canvasY + PLAYER_RADIUS*SCALING_FACTOR + 8,
      PLAYER_RADIUS*SCALING_FACTOR * 2 * (1 - player.hp / PLAYER_MAX_HP),
      2,
    );
  }
}

function updateHealth(hp) {
  document.getElementById('health_number').innerHTML = `<center>- ${hp} -</center>`;
}

function renderBullet(me, bullet) {
    const { x, y, map_number } = bullet;
   if(me.map_number == map_number){
    context.drawImage(
      getAsset('bullet.svg'),
     x*SCALING_FACTOR + (canvas.width / 2 - MAP_SIZE_X*SCALING_FACTOR / 2),
     y*SCALING_FACTOR + (canvas.height / 2 - MAP_SIZE_Y*SCALING_FACTOR / 2),
      BULLET_RADIUS*SCALING_FACTOR * 2,
      BULLET_RADIUS*SCALING_FACTOR * 2,
    );
  }
}

function renderObstacle(me, obstacle) {
    const { x, y, direction, width, height, map_number } = obstacle;
  if(me.map_number == map_number){
    const cX = x*SCALING_FACTOR + (canvas.width / 2 - MAP_SIZE_X*SCALING_FACTOR / 2);
    const cY = y*SCALING_FACTOR + (canvas.height / 2 - MAP_SIZE_Y*SCALING_FACTOR / 2);

    context.save();

    context.translate(cX, cY);
    context.rotate(direction);

    context.drawImage(
      getAsset('basic_obstacle.png'),
     0,
     0,
      width*SCALING_FACTOR,
      height*SCALING_FACTOR,
    );
    // context.rotate(0);
    // context.translate(-cX, -cY);
    context.restore();
  }
}

function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE_X*SCALING_FACTOR / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE_Y*SCALING_FACTOR / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
