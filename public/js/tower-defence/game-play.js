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
        // Create objects
        console.log("GamePlay");
        const pistol = scene.add.image(250, 300, "pistol");
        const station = scene.add.image((btmLeft.x + 1) * cellSize.width, (btmLeft.y) * cellSize.height, "station");
        initFromGrid(scene);  // add bricks
    },

    update: function() {
        // Update objects & variables
    }
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






// Add scene to list of scenes
myGame.scenes.push(gamePlayState);