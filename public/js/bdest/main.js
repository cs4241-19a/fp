
console.log('This is printed.')

let board  = {
  initialize: function () {
    this.score = 0;
    this.lives = 5;
    this.active = false;
    this.ballVelY = 300;
    this.ballVelX = 100;
  },
  reloadBoard: function() {

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
  ball = this.physics.add.image(100, 100, "ball").setScale(0.1);
  ball.setCollideWorldBounds(true);
  ball.setVelocityX(board.ballVelX);
  ball.setVelocityY(board.ballVelY);
  ball.body.setAllowGravity(false);
  ball.setBounce(1, 1);

  // Add paddle to game
  paddle = this.physics.add.image(300, 750, "paddle").setScale(0.75);
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
  paddle.setImmovable(false);
  if (cursors.left.isDown) {
    paddle.setVelocityX(-150);
  } else if (cursors.right.isDown) {
    paddle.setVelocityX(150);
  } else {
    paddle.setVelocityX(0);
  }
  paddle.setImmovable();
}

/***
 * Callback to handle the collision between the ball and paddle.
 * @param {Phaser.GameObjects.GameObject} ball - The ball
 * @param {Phaser.GameObects.GameObject} paddle - The paddle
 */
function collisionWithBall (ball, paddle) {
  /* The paddle should stay where it is */
  console.log(paddle.y)
  board.ballVelY = -board.ballVelY;
  board.ballVelX = -board.ballVelX;
  ball.setVelocityY(board.ballVelY);
  ball.setVelocityX(board.ballVelX);
}