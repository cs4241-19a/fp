const preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Preload(){
            Phaser.Scene.call(this, {key: 'Preload'});
        },
    preload: function() {
        // Preload images for this state
        this.load.svg("pistol", "/assets/tower-defence/pistol-gun.svg", { width: 40, height: 40 });
    },

    create: function() {
        console.log("Preload");
        game.scene.start('MainMenu');
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(preloadState);