const gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
        function GamePlay(){
            Phaser.Scene.call(this, {key: "GamePlay"});
        },

    preload: function() {
        // Preload images for this state
    },

    create: function() {
        const scene = this;
        scene.i = 0;
        scene.timer1Stopped = true;
        scene.timer1 = null;

        // Create objects
        console.log("GamePlay");
        const pistol = scene.add.image(250, 300, "pistol");
        const station = scene.add.image((btmLeft.x + 1) * cellSize.width, (btmLeft.y) * cellSize.height, "station");
        initFromGrid(scene);  // add bricks

        const truck = scene.add.image(-500, -500, "truck3b");
        truck.angle = 90;
        scene.e1 = Enemy(truck, 0.003);
        console.log(scene.e1);
    },

    update: function() {
        const scene = this;
        scene.e1.move();


    },
});

// Create

function initFromGrid(scene) {
    for (let i = 0; i < grid.length; i++) {  // height
        for (let j = 0; j < grid[i].length; j++) {  // width
            if (grid[i][j] === cellTypes.BLOCK) {
                scene.add.image(j * cellSize.width, i * cellSize.height, "brick1").setOrigin(0, 0);
            }
        }
    }
}


// Update
function Enemy(sprite, moveSpeed) {
    let pathPoints;
    let moveIdx = 0;
    let atBase = false;
    const spriteRotation = sprite.rotation;  // should be passed in facing right


    function move() {
        if (!pathPoints) {
            pathPoints = getPathPoints(enemyEnterCoord);
        }
        if (!atBase) {
            const gx = Phaser.Math.Interpolation.CatmullRom(pathPoints.x, moveIdx);
            const gy = Phaser.Math.Interpolation.CatmullRom(pathPoints.y, moveIdx);
            // console.log(px, py);
            const newX = gx * cellSize.width + (cellSize.width / 2);
            const newY = gy * cellSize.height + (cellSize.width / 2);
            const angle = Phaser.Math.Angle.Between(sprite.x, sprite.y, newX, newY);
            sprite.rotation = spriteRotation + angle;
            console.log(angle);
            sprite.x = newX;
            sprite.y = newY;
            moveIdx += moveSpeed;
            // console.log(moveIdx);
            checkAtBase(gx, gy);
        } else {
            // base loses a life
        }
    }

    /**
     * Check if at the base
     * @param gx Grid x coordinate
     * @param gy Grid y coordinate
     */
    function checkAtBase(gx, gy) {
        if (gx <= baseEntrance.x && gy >= baseEntrance.y) {
            atBase = true;
        }
    }

    return {sprite, move}
}



// Add scene to list of scenes
myGame.scenes.push(gamePlayState);