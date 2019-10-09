const preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Preload(){
            Phaser.Scene.call(this, {key: "Preload"});
        },
    preload: function() {
        // Preload images for this state
        this.load.svg("brick1", "/assets/tower-defence/brick1.svg", cellSize);
        this.load.svg("pistol", "/assets/tower-defence/pistol-gun.svg", cellSize);
        this.load.svg("station", "/assets/tower-defence/station.svg", {width: 2 * cellSize.width, height: 2 * cellSize.height});
        this.load.svg("machine gun", "/assets/tower-defence/machine-gun.svg", cellSize);
        this.load.svg("cannon", "/assets/tower-defence/cannon.svg", cellSize);
        this.load.image("truck3b", "/assets/tower-defence/truck3b_body.png");
    },

    create: function() {
        console.log("Preload");
        game.scene.start("MainMenu");
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(preloadState);