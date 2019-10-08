"use strict";


/* Value to configurable information about the current board */
let board = {
    initialize: function () {
        this.score = 0; // Current score
        this.level = 1; // Current level
        this.lives = 5; // Current lives
        this.active = false; // Whether the ball is in play
        this.ballVelY = -500; // Constant starting velocity Y
        this.ballVelX = -200; // Constant starting velocity X
        this.paddleSpeed = 300; // Constant paddle speed.
        this.barXScale = 0.225; // X scale for bars
        this.barYScale = 0.5; // Y scale for bars
        this.bricksLeft = 1;
        // Current board configuration
        this.rowConfiguration = ["r_bar", "o_bar", "o_bar", "y_bar", "y_bar"];
        this.over = false;  // means the game is over
    }
};

let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    parent: "game-area", physics: { default: 'arcade',
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

const path = "/assets/bdest/";
let input;
let ball;
let paddle;
let bricks = [];
let cursors;
let spaceBar;
let scoreText;
let livesText;
let gameOverText;
let startingText;

function preload() {
    let ball = this.load.image("ball", path + "ball.png");
    ball.smoothed = false;
    this.load.image("r_bar", path + "bar_red.png");
    this.load.image("o_bar", path + "bar_orange.png");
    this.load.image("y_bar", path + "bar_yellow.png");
    this.load.image("paddle", path + "paddle.png");
}

function create() {
    board.initialize();

    // Keyboard Controls;
    input = this.input;

    // Add paddle to game
    paddle = this.physics.add.image(300, 750, "paddle").setScale(0.5);
    paddle.setCollideWorldBounds(true);
    paddle.body.setAllowGravity(false);

    // Add ball to game
    ball = this.physics.add.image(paddle.x, 700 - 23 * 0.5, "ball").setScale(0.075);
    ball.setCollideWorldBounds(true);
    ball.body.setAllowGravity(false);
    ball.setBounce(1, 1);
    ball.setVisible(false);

    // Add collision
    this.physics.add.collider(ball, paddle, collisionWithBall, null);

    // Keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // HARD BINDING !!!!
    let initializeBricksArrayBound = initializeBricksArray.bind(this);

    // Get bricks onto the field
    initializeBricksArrayBound(bricks, board.barXScale, board.barYScale, board.rowConfiguration);
    board.bricksLeft = bricks.length;

    // Add score HUD
    scoreText = this.add.text(16, 16, 'Score: ' + board.score, { fontSize: '32px', fill: '#fff' });
    livesText = this.add.text(400, 16, 'Lives: ' + board.lives, { fontSize: '32px', fill: '#fff' });
    gameOverText = this.add.text(85, 400, 'GAME OVER', { fontSize: '64px', fill: '#fff' });
    gameOverText.setVisible(false);
    startingText = this.add.text(60, 600, 'Press the space bar to serve!', { fontSize: '32px', fill: '#fff' });
}

function update() {
    let paddleActions = onKeyPress.bind(this);
    paddleActions();

    if (board.lives === 0 && !board.over) {
        board.over = true;
        gameOverText.setVisible(true);
        startingText.setVisible(true);
        submitScore();
    }

    if (ball !== undefined) {
        if (ball.y > 780) {
            // Update lives counter
            board.lives -= 1;
            livesText.setText("Lives: " + board.lives);
            // Make ball stop and invisible
            ball.setVisible(false);
            ball.setY(700);
            ball.setVelocityY(0);
            ball.setVelocityX(0);
            board.active = false;
        } else if (board.bricksLeft === 0) {
            // Make ball stop and invisible
            ball.setVisible(false);
            ball.setY(700);
            ball.setVelocityY(0);
            ball.setVelocityX(0);

            // Reset all of the bricks
            resetBricks(bricks);
            board.active = false;
        }
    }
}

/***
 * Re-enables the current ball.
 */
const addBall = function () {
    ball.setVisible(true);
    ball.setImmovable(false);
    ball.setX(paddle.x);
    ball.setY(750 - 23 * 0.5);
    ball.setVelocityX(board.ballVelX);
    ball.setVelocityY(board.ballVelY);
}

/***
 * Function to handle input events.
 */
const onKeyPress = function () {
    /* Enable the paddle to move when a key is pressed */
    paddle.setImmovable(false);

    /* Movement */
    if (cursors.left.isDown) {
        paddle.setVelocityX(-board.paddleSpeed);
    } else if (cursors.right.isDown) {
        paddle.setVelocityX(board.paddleSpeed);
    /* Only send ball if board is not active (i.e. life is not lost or game over) */
    } else if (spaceBar.isDown && !board.active && board.lives > 0) {
        startingText.setVisible(false);
        let addBallBound = addBall.bind(this);
        addBallBound();
        board.active = true;
    } else if (spaceBar.isDown && board.lives === 0) {
        startingText.setVisible(false);
        resetBoard();
        let addBallBound = addBall.bind(this);
        addBallBound();
    }
    else {
        paddle.setVelocityX(0);
    }
    /* Disable movement to prevent collision */
    paddle.setImmovable();
}

/***
 * Function to initialize the array of bricks that store the information of
 * each brick on the board.
 * @param {Array} bricks - empty array of bricks
 * @param {Number} brickX - X scale of the bricks
 * @param {Number} brickY - Y scale of the bricks
 */
const initializeBricksArray = function (bricks, brickX, brickY, rows) {

    let currentY = 100;
    for (let i = 0; i < rows.length; i++) {
        let currentX = 14 + (320 * brickX / 2);
        for (let j = 0; j < 8; j++) {
            let currBrickWrapper = new Brick(bricks, rows[i]);
            let brickObj = this.physics.add.image(currentX, currentY, rows[i]).setScale(brickX, brickY);
            brickObj.body.setAllowGravity(false);
            brickObj.setImmovable();
            // Add collision
            this.physics.add.collider(ball, brickObj, barCollision, null);
            brickObj.brick = currBrickWrapper;
            bricks.push(brickObj);
            currentX += 320 * brickX;
        }

        currentY += 100 * brickY;
    }
}

/**
 * Brick object constructor
 * @param {Array} bricks - array of bricks
 * @param {String} color - type of bar
 */
function Brick(bricks, color) {
    /* Set score based on color */
    if (color === "r_bar") {
        this.score = 200;
    } else if (color === "o_bar") {
        this.score = 100;
    } else if (color === "y_bar") {
        this.score = 50;
    }
}

/***
 * Callback to handle the collision between the ball and paddle.
 * @param {Phaser.GameObjects.GameObject} ball - The ball
 * @param {Phaser.GameObjects.GameObject} paddle - The paddle
 */
function collisionWithBall(ball, paddle) {
    /* The paddle should stay where it is */
    let currentVelocity = Math.sqrt(board.ballVelX ** 2 + board.ballVelY ** 2);
    /* Get the angle from the center of the center of the paddle to the ball */
    let reflectionAngle = Math.atan(Math.abs(ball.y - paddle.y) / Math.abs(paddle.x - ball.x));

    let Xreflect = (paddle.x - ball.x < 0) ? 1 : -1;

    /* Set a default velocity from 0.75 to 1.25 from current */
    const rand = Math.random() * 50;
    currentVelocity = (rand > 25) ? currentVelocity * 1.25 : currentVelocity * 0.75;

    ball.setVelocityX(Xreflect * currentVelocity * Math.cos(reflectionAngle));
    ball.setVelocityY(-currentVelocity * Math.sin(reflectionAngle));
}

/***
 * Callback to handle collisions.
 */
function barCollision(ball, brick) {
    board.score += brick.brick.score;
    scoreText.setText("Score: " + board.score);
    board.bricksLeft--;
    brick.disableBody(true, true);
}


/***
 * Function to reset the board after a game over.
 */
function resetBoard() {
    board.active = true;
    board.over = false;

    resetBricks(bricks);

    // Reset lives counter
    board.lives = 5;
    livesText.setText("Lives: " + board.lives);

    // Reset score counter
    board.score = 0;
    scoreText.setText("Score: " + board.score);

    // Make the game over text disappear
    gameOverText.setVisible(false);
}


/***
 * Submit the final score from the user
 */
function submitScore() {
    let scoreModel = $("#gameScoreFormModal");
    attachHeading(`Score: ${board.score}`);
    scoreModel.on("hidden.bs.modal", ()=>{});
    attachSubmit({ score: board.score }, () => {
        scoreModel.modal("hide");
    });
    scoreModel.modal("show");  // user jQuery to show the modal
}

/***
 * Reset all of the bricks on the board.
 * @param {Array} bricks - Array of Brick objects.
 */
function resetBricks(bricks) {
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].enableBody(true, bricks[i].x, bricks[i].y, true, true);
    }
    board.bricksLeft = bricks.length;
}