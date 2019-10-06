const Phaser = require('phaser');

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

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

/**
 * This handles getting the assets loaded in
 */
function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
  );
}

let platforms;
let player;
let cursors;
let stars;
let bombs;
let score = 0;
let scoreText;
let gameOver = false;
/**
 * This happens once everything is read
 */
function create() {
  // we need to make sure that the origin of the image is the upper-left hand corner
  this.add.image(0, 0, 'sky').setOrigin(0, 0);

  //a static body isn't affected by the game physics, but a dynamic one would be.
  platforms = this.physics.add.staticGroup();

  //A physics group lets us apply settings to a group of objects that are similar. In this case its
  // adding them to the static group.
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  //Player settings
  //create the player and add it to the physics system.
  player = this.physics.add.sprite(100, 450, 'dude');

  //bounce when it collides with the edges of the world.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //in this case we add 11 stars, plus the one created by physics.add for a total of 12.
  //we then set the X and Y values to 12 and 0, and add 70 to the x for each child
  bombs = this.physics.add.group();

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  //for each start object give it a bounce between .4 and .8
  stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, null, this);
  //on overlap (because we don't collide with stars) run the collect star method
  this.physics.add.overlap(player, stars, collectStar, null, this);


  //when going left use the 'dude' tagged sprite sheet and loop frames from 0 to 3 @ 10fps
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  //create inputs using built-ins from phaser
  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}

/**
 * This is run each frame
 */
function update() {
  if (gameOver)
  {
    scoreText.setText('press up to restart');
    if(cursors.up.isDown){
      gameOver = false;
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);

      });
      bombs.getChildren().map(child => child.destroy());
      bombs.clear(true);
      player.setPosition(450, 100);
      score = 0;
      this.physics.resume();

      player.setTint(0xffffff);
    }
  }
  //check to see if any of the keys are down and move the character
  if (cursors.left.isDown)
  {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
    player.setVelocityX(160);

    player.anims.play('right', true);
  }
  else
  {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
    //this is the velocity in pixels/second
    player.setVelocityY(-350);
  }

}

function collectStar (player, star)
{
  //make the object invisble and inactive in the game world
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);
  if (stars.countActive(true) === 0)
  {
    //  A new batch of stars to collect
    stars.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

  }
}

function hitBomb(player, bombs){
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}