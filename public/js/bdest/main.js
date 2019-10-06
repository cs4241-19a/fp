
console.log('This is printed.')

/* Value to configurable information about the current board */
let board  = {
  initialize: function () {
    this.score = 0;
    this.lives = 5;
    this.active = false;
    this.ballVelY = 500; // Constant starting velocity Y
    this.ballVelX = 200; // Constant starting velocity X
  }
};

let config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

let game = new Phaser.Game(config);

const path = "/assets/bdest/"
let input;
let ball;
let paddle;
let bricks = [];
let cursors;

function preload () {
  let ball = this.load.image("ball", path + "ball.png");
  ball.smoothed = false;
  this.load.image("r_bar", path + "bar_red.png");
  this.load.image("o_bar", path + "bar_orange.png");
  this.load.image("y_bar", path + "bar_yellow.png");
  this.load.image("paddle", path + "paddle.png");
}

function create () {
  input = this.input;

  board.initialize();
  // Add ball to game
  ball = this.physics.add.image(100, 100, "ball").setScale(0.075);
  ball.setCollideWorldBounds(true);
  ball.setVelocityX(board.ballVelX);
  ball.setVelocityY(board.ballVelY);
  ball.body.setAllowGravity(false);
  ball.setBounce(1, 1);

  // Add paddle to game
  paddle = this.physics.add.image(300, 750, "paddle").setScale(0.5);
  paddle.setCollideWorldBounds(true);
  paddle.body.setAllowGravity(false);

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(ball, paddle, collisionWithBall, null);
}

function update () {
  repositionPaddle();
}

/***
 * Function to move the paddle with the arrow keys.
 */
function repositionPaddle () {
  /* Enable the paddle to move when a key is pressed */
  paddle.setImmovable(false);

  if (cursors.left.isDown) {
    paddle.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    paddle.setVelocityX(200);
  } else {
    paddle.setVelocityX(0);
  }
  /* Disable movement to prevent collision */
  paddle.setImmovable();
}

/***
 * Function to initialize the array of bricks that store the information of
 * each brick on the board.
 * @param {Array} bricks - empty array of bricks
 * @param {Integer} brickX - length of the bricks
 * @param {integer} brickY - height of the bricks
 */
function initializeBricksArray (bricks, brickX, brickY) {

}

/***
 * Callback to handle the collision between the ball and paddle.
 * @param {Phaser.GameObjects.GameObject} ball - The ball
 * @param {Phaser.GameObects.GameObject} paddle - The paddle
 */
function collisionWithBall (ball, paddle) {
  /* The paddle should stay where it is */
  console.log(paddle.y)
  let currentVelocity = Math.sqrt(board.ballVelX ** 2 + board.ballVelY ** 2)
  /* Get the angle from the center of the center of the paddle to the ball */
  let reflectionAngle = Math.atan(Math.abs(ball.y - paddle.y)/Math.abs(paddle.x - ball.x));

  let Xreflect = (paddle.x - ball.x < 0) ? 1 : -1;

  /* Set a default velocity from 0.75 to 1.25 from current */
  const rand = Math.random() * 50;
  currentVelocity  = (rand > 25) ? currentVelocity * 1.25 : currentVelocity * 0.75;

  ball.setVelocityX(Xreflect * currentVelocity * Math.cos(reflectionAngle));
  ball.setVelocityY(-currentVelocity * Math.sin(reflectionAngle));
}