
console.log('This is printed.')

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
let scoreText;

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
    ball = this.physics.add.image(paddle.x, 750 - 23*0.5, "ball").setScale(0.075);
    ball.setCollideWorldBounds(true);
    ball.setVelocityX(board.ballVelX);
    ball.setVelocityY(board.ballVelY);
    ball.body.setAllowGravity(false);
    ball.setBounce(1, 1);

    // Keyboard controls
    cursors = this.input.keyboard.createCursorKeys();

    // HARD BINDING !!!!
    let initializeBricksArrayBound = initializeBricksArray.bind(this);

    // Get bricks onto the field
    initializeBricksArrayBound(bricks, board.barXScale, board.barYScale, board.rowConfiguration);
    board.bricksLeft = bricks.length;

    // Add collision
    this.physics.add.collider(ball, paddle, collisionWithBall, null);

    // Add score HUD
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
}

function update() {
    repositionPaddle();

}

/***
 * Function to move the paddle with the arrow keys.
 */
function repositionPaddle() {
    /* Enable the paddle to move when a key is pressed */
    paddle.setImmovable(false);

    if (cursors.left.isDown) {
        paddle.setVelocityX(-board.paddleSpeed);
    } else if (cursors.right.isDown) {
        paddle.setVelocityX(board.paddleSpeed);
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
 * @param {Number} brickX - X scale of the bricks
 * @param {Number} brickY - Y scale of the bricks
 */
const initializeBricksArray = function (bricks, brickX, brickY, rows) {

    let currentY = 100;
    for (let i = 0; i < rows.length; i++)
    {
        let currentX = 10 + (320 * brickX / 2);
        for (let j = 0; j < 8; j++)
        {
            let currBrickWrapper = new Brick(bricks, rows[i]);
            let brickObj = this.physics.add.image(currentX, currentY, rows[i]).setScale(brickX, brickY);
            brickObj.body.setAllowGravity(false);
            brickObj.setImmovable();
            // Add collision
            this.physics.add.collider(ball, brickObj, barCollision, null);
            brickObj.brick = currBrickWrapper;
            bricks.push(currBrickWrapper);
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
    currId = Math.random() * Number.MAX_SAFE_INTEGER;
    this.id = currId;
    /* Set score based on color */
    if (color === "r_bar") {
        this.score = 200;
    } else if (color === "o_bar") {
        this.score = 100;
    } else if (color === "y_bar") {
        this.score = 50;
    }
    /* Generate a random brick ID */
    if (!bricks.length === 0) {
        let breakLoop = false;
        while (!breakLoop) {
            if (bricks.filter(brick => { brick.brick.id !== currID; }).length == 0) {
                breakLoop = true;
            } else {
                currId = Math.random * Number.MAX_SAFE_INTEGER;
                this.id = currId;
            }
        }
    }
}

/***
 * Callback to handle the collision between the ball and paddle.
 * @param {Phaser.GameObjects.GameObject} ball - The ball
 * @param {Phaser.GameObects.GameObject} paddle - The paddle
 */
function collisionWithBall(ball, paddle) {
    /* The paddle should stay where it is */
    console.log(paddle.y)
    let currentVelocity = Math.sqrt(board.ballVelX ** 2 + board.ballVelY ** 2)
    /* Get the angle from the center of the center of the paddle to the ball */
    let reflectionAngle = Math.atan(Math.abs(ball.y - paddle.y) / Math.abs(paddle.x - ball.x));

    let Xreflect = (paddle.x - ball.x < 0) ? 1 : -1;

    /* Set a default velocity from 0.75 to 1.25 from current */
    const rand = Math.random() * 50;
    currentVelocity = (rand > 25) ? currentVelocity * 1.25 : currentVelocity * 0.75;

    ball.setVelocityX(Xreflect * currentVelocity * Math.cos(reflectionAngle));
    ball.setVelocityY(-currentVelocity * Math.sin(reflectionAngle));
}


function barCollision(ball, bar) {
    board.score += bar.brick.score;
    scoreText.setText("Score: " + board.score);
    board.bricksLeft--;
    bar.destroy();
}