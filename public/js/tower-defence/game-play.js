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
        // Create objects
        console.log("GamePlay");
        const pistol = this.add.image(250, 300, "pistol");
        const station = this.add.image((btmLeft.x + 1) * cellSize.width, (btmLeft.y) * cellSize.height, "station");
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);