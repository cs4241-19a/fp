const gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
        function GamePlay(){
            Phaser.Scene.call(this, {key: 'GamePlay'});
        },

    preload: function() {
        // Preload images for this state
    },

    create: function() {
        // Create objects
        console.log("GamePlay");
        const pistol = this.add.image(250, 300, "pistol");
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);