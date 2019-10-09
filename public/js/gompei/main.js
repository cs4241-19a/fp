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
const START_STATE = 3;
const path = "/assets/gompei/";

let state = START_STATE; // current state
let newState = false;

let game = new Phaser.Game(config);
let player;
let rock = [];
let grass;

let cursors;
let pauseKey;
let spaceBar;
let groundGroup;


let score = 0;
let maxRocks = 3;
let rockSpeed = -200;
let rockAcc = 0.05;

let scoreText;
let pauseText;
let startText;

let playerYVelocity;
let extraJumps = 1;
let jumpsLeft = extraJumps;
let canJumpAgain = true;



// preload images
function preload () {
    this.load.image("gompei", path + "gompei.png"); // Source: https://depositphotos.com/273483776/stock-illustration-pixel-art-goat-character-isolated.html
    this.load.image("ground", path + "groundLong.png"); 
    this.load.image("rock", path + "rock.png"); // Source: http://pixelartmaker.com/art/da268f06e621b21 
    this.load.image("grass", path + "grassLong.png"); // Source: https://imgbin.com/png/XmJBdYii/pixel-art-game-sprite-png 
}

// Set up images on page with correct properties
function create () {

    // this.cameras.main.backgroundColor.setTo(19, 64, 84);

    // Set ground properties (separate from grass since grass has no physics)
    groundGroup = this.physics.add.staticGroup();
    groundGroup.create(0, 560, "ground");

    // Set moving ground properties
    grass = this.add.tileSprite(0,560, this.width, this.height, 'grass')

    // set player properties
    player = this.physics.add.sprite(50, 450, "gompei").setScale(0.7);
    this.physics.add.collider(player, groundGroup);
    player.setCollideWorldBounds(true);
    playerYVelocity = 0;

    // set rock properties
    let offset = 700;
    for (let i = 0; i < maxRocks; i++) {
        rock[i] = this.physics.add.image(offset, 450, "rock").setScale(0.25);
        offset += 450;
        this.physics.add.collider(player, rock[i], rockCollision, null);
        rock[i].setVelocityX(rockSpeed);
        this.physics.add.collider(rock[i], groundGroup);
        rock[i].body.allowGravity = false;
    }

    // Set up inputs
    cursors = this.input.keyboard.createCursorKeys();
    pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Add score HUD
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // Set up pause message
    pauseText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "PAUSED (\'P\' to resume)", { fontSize: '28px', fill: '#fff' });
    pauseText.setX(this.cameras.main.centerX - pauseText.width / 2);
    pauseText.setY(this.cameras.main.centerY - pauseText.height / 2);
    pauseText.visible = false; // Hide pause text

    // Set up start message
    startText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "Press SPACE to Start!", { fontSize: '28px', fill: '#fff' });
    startText.setX(this.cameras.main.centerX - pauseText.width / 2);
    startText.setY(this.cameras.main.centerY - pauseText.height / 2);
    
    // Stop everything at start
    stopPlayer();
    stopRocks();
    
}

// Updates and re draws images
function update () {
    
    pauseKey.on('down', function(event){
        if (!newState) {
            if (state === PLAY_STATE) {
                pauseGame();
                newState = true;
            }
            else if (state === PAUSE_STATE) {
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

        // Set speed of ground
        grass.tilePositionX -= rockSpeed / 60;

        // Steadily increase rock speed
        rockSpeed-=rockAcc;
        setRockSpeeds(rockSpeed);

        // save player velocity in case of pause
        playerYVelocity = player.body.velocity.y;
    
        // Allow player to jump again when letting go of up key
        if (!cursors.up.isDown) {
            canJumpAgain = true;
        }

        // Jump when on ground
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-400);
            canJumpAgain = false;
        }
    
        // Fast fall in midair
        else if (cursors.down.isDown && !player.body.touching.down) {   
            player.setVelocityY(player.body.velocity.y + 30);
            
        }

        // Double Jump
        else if (cursors.up.isDown && !player.body.touching.down && jumpsLeft > 0 && canJumpAgain) {
            let newSpeed = -400;
            player.setVelocityY(newSpeed);
            jumpsLeft--;
            canJumpAgain = false;
        }

        // Refresh double jump when landing on ground
        else if (player.body.touching.down) {
            jumpsLeft = extraJumps;
        }
    
        // Reset rocks after going off left side of screen
        for (let i = 0; i < maxRocks; i++) {
            if (rock[i].x < 0) {
                rock[i].x = (Math.random() * 600) + 800
            }
        }
    }
    else if (state === START_STATE){
        if (spaceBar.isDown) {
            resumeGame();
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
    state = PAUSE_STATE;
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
    state = PLAY_STATE;
    resumePlayer();
    resumeRocks();
    pauseText.visible = false;
    startText.visible = false;

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