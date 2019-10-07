var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 450 },
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

let game = new Phaser.Game(config);
let player;
let cursors;
let groundGroup;
let rock = [];
const path = "/assets/gompei/";
let score = 0;
let maxRocks = 3;
let rockSpeed = -200;
let state = PLAY_STATE; // current state
let scoreText;

// preload images
function preload () {
    this.load.image("gompei", path + "gompei.jpeg");
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
    player = this.physics.add.sprite(50, 450, "gompei").setScale(0.6);
    this.physics.add.collider(player, groundGroup);
    player.setCollideWorldBounds(true);

    // set rock properties
    for (let i = 0; i < maxRocks; i++) {
        rock[i] = this.physics.add.image(offset, 445, "rock").setScale(0.25);
        offset += 450;
        this.physics.add.collider(player, rock[i], rockCollision, null);
        rock[i].setVelocityX(rockSpeed);
        this.physics.add.collider(rock[i], groundGroup);
        rock[i].body.allowGravity = false;
    }

    cursors = this.input.keyboard.createCursorKeys();

    // Add score HUD
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

}

// Updates and re draws images
function update () {
    if (state === PLAY_STATE) {

        // Update score
        score++;
        scoreText.setText("Score: " + score);

        // Steadily increase rock speed
        rockSpeed+=0.5;
    
        // jump
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-400);
        }
    
        // fast fall
        else if (cursors.down.isDown && !player.body.touching.down) {   
            player.setVelocityY(player.body.velocity.y + 30);
        }
    
        // Reset rocks after going off left side of screen
        for (let i = 0; i < maxRocks; i++) {
            if (rock[i].x < 0) {
                rock[i].x = (Math.random() * 500) + 800
            }
        }
    }
}

// Put game in lost state when player collides with a rock
function rockCollision () {
    state = LOST_STATE;

    // Stop player
    player.body.allowGravity = false;
    player.setVelocityY(0);
    player.setVelocityX(0);

    // Stop all rocks
    for (let i = 0; i < maxRocks; i++) {
        rock[i].setVelocityX(0);
        rock[i].setVelocityY(0);
    }
}