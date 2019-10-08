var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    parent: "game-area",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
const PLAY_STATE = 0;
const LOST_STATE = 1;
const PAUSE_STATE = 2;

let game = new Phaser.Game(config);
let player;
let cursors;
let pauseKey;
let groundGroup;
let rock = [];
const path = "/assets/gompei/";
let score = 0;
let maxRocks = 3;
let rockSpeed = -200;
let state = PLAY_STATE; // current state
let scoreText;
let playerYVelocity;
let newState = false;
let rockAcc = 0.1;
let extraJumps = 1;
let jumpsLeft = extraJumps;
let canJumpAgain = true;
let pauseText;

// preload images
function preload () {
    this.load.image("gompei", path + "gompei.png");
    this.load.image("ground", path + "groundLong.png");
    this.load.image("rock", path + "rock.png");
}

// set up images on page with correct properties
function create () {

    // set ground properties
    groundGroup = this.physics.add.staticGroup();
    groundGroup.create(0, 560, "ground");
    let offset = 700;

    // set player properties
    player = this.physics.add.sprite(50, 450, "gompei").setScale(0.7);
    this.physics.add.collider(player, groundGroup);
    player.setCollideWorldBounds(true);

    // set rock properties
    for (let i = 0; i < maxRocks; i++) {
        rock[i] = this.physics.add.image(offset, 450, "rock").setScale(0.25);
        offset += 450;
        this.physics.add.collider(player, rock[i], rockCollision, null);
        rock[i].setVelocityX(rockSpeed);
        this.physics.add.collider(rock[i], groundGroup);
        rock[i].body.allowGravity = false;
    }

    cursors = this.input.keyboard.createCursorKeys();
    pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    // Add score HUD
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // Set up pause message
    pauseText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "PAUSED", { fontSize: '32px', fill: '#fff' });
    pauseText.setX(this.cameras.main.centerX - pauseText.width / 2);
    pauseText.setY(this.cameras.main.centerY - pauseText.height / 2);
    pauseText.visible = false;

}

// Updates and re draws images
function update () {
    
    pauseKey.on('down', function(event){
        if (!newState) {
            if (state === PLAY_STATE) {
                state = PAUSE_STATE;
                pauseGame();
                newState = true;
            }
            else if (state === PAUSE_STATE) {
                state = PLAY_STATE;
                resumeGame();
                newState = true;
            }
        }
    })

    pauseKey.on('up', function(event){
        if (state === PLAY_STATE) {
            newState = false;
        }
        else if (state === PAUSE_STATE) {
            newState = false;
        }
    })

    if (state === PLAY_STATE) {

        // Update score
        score++;
        scoreText.setText("Score: " + score);

        // Steadily increase rock speed
        rockSpeed-=rockAcc;
        setRockSpeeds(rockSpeed);

        playerYVelocity = player.body.velocity.y;
    
        if (!cursors.up.isDown) {
            canJumpAgain = true;
        }

        // jump
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-400);
            canJumpAgain = false;
        }
    
        // fast fall
        else if (cursors.down.isDown && !player.body.touching.down) {   
            player.setVelocityY(player.body.velocity.y + 30);
            
        }

        // double check
        else if (cursors.up.isDown && !player.body.touching.down && jumpsLeft > 0 && canJumpAgain) {
            let newSpeed = -400;
            player.setVelocityY(newSpeed);
            jumpsLeft--;
            canJumpAgain = false;
        }


        // refresh double jump
        else if (player.body.touching.down) {
            jumpsLeft = extraJumps;
        }
    
        // Reset rocks after going off left side of screen
        for (let i = 0; i < maxRocks; i++) {
            if (rock[i].x < 0) {
                rock[i].x = (Math.random() * 500) + 800
            }
        }
    }
}

function setRockSpeeds (rockSpeed) {
    for (let i = 0; i < maxRocks; i++) {
        rock[i].setVelocityX(rockSpeed);
    }

}

// Put game in lost state when player collides with a rock
function rockCollision () {
    state = LOST_STATE;

    stopPlayer();
    stopRocks();

    const scoreModel = $("#gameScoreFormModal");
    const resetGame = data => {
        location.reload();
    };

    attachHeading(`Score: ${score} points`);
    scoreModel.on("hidden.bs.modal", resetGame);
    attachSubmit({score: score}, () => {
        scoreModel.modal("hide");
    });
    scoreModel.modal("show");  // user jQuery to show the modal
}

function pauseGame () {
    stopRocks();
    stopPlayer();
    pauseText.visible = true;
}

function stopRocks () {
    // Stop all rocks
    for (let i = 0; i < maxRocks; i++) {
        rock[i].setVelocityX(0);
        rock[i].setVelocityY(0);
    }
}

function stopPlayer () {
    // Stop player
    player.body.allowGravity = false;
    player.setVelocityY(0);
    player.setVelocityX(0);
}

function resumeGame () {
    resumePlayer();
    resumeRocks();
    pauseText.visible = false;

}

function resumePlayer () {
    // Stop player
    player.body.allowGravity = true;
    player.setVelocityY(playerYVelocity);
    player.setVelocityX(0);
}

function resumeRocks () {
    for (let i = 0; i < maxRocks; i++) {
        rock[i].setVelocityX(rockSpeed);
        rock[i].setVelocityY(0);
    }
}