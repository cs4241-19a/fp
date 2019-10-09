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
        scene.menuSelection = null;  // set to {x, y, cellType} when has a value

        // Create objects
        console.log("GamePlay");
        // const pistol = scene.add.image(250, 300, "pistol");
        const station = scene.add.image((btmLeft.x + 1) * cellSize.width, (btmLeft.y) * cellSize.height, "station");
        initFromGrid(scene);  // add bricks

        scene.enemies = [];
        // Enemy types
        const enemy_events = {};
        scene.EnemyUnits = {Trucks: Truck(enemy_events)};
        scene.Towers = {SandBags: SandBag()};


        scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), 1));
        scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), 2));
        scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), 3));
        scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), 4));
        scene.Towers.SandBags.create(scene.Towers.SandBags.Sand(scene, {x: 1, y: 1}));

        // cursor
        this.cursor = this.add.graphics();
        this.cursor.lineStyle(2, 0x000000, 1);
        this.cursor.strokeRect(0, 0, 40, 40);

        // scene.e1 = Enemy(truck, 0.003, 75);
        // scene.e1 = Enemy(truck, 0.003, 75);
        console.log(scene.enemies);
    },

    update: function() {
        const scene = this;
        updateMarker(scene);
        scene.enemies.forEach(enemy => {
            enemy.move();
        });

    },
});

// Create

function initFromGrid(scene) {
    for (let i = 0; i < grid.length; i++) {  // height
        for (let j = 0; j < grid[i].length; j++) {  // width
            switch (grid[i][j]) {
                case cellTypes.WALL:
                    scene.add.image(j * cellSize.width, i * cellSize.height, "brick1").setOrigin(0, 0);
                    break;
                case cellTypes.MENU_SAND:
                    scene.add.image(j * cellSize.width, i * cellSize.height, "sand").setOrigin(0, 0);
                    break;
                case cellTypes.MENU_MG:
                    scene.add.image(j * cellSize.width, i * cellSize.height, "machine gun").setOrigin(0, 0);
                    break;
                case cellTypes.MENU_CANNON:
                    scene.add.image(j * cellSize.width, i * cellSize.height, "cannon").setOrigin(0, 0);
                    break;

            }
        }
    }
}


// Update


function placeTower(scene, coord) {
    console.log("place");
    if (grid[coord.y][coord.x] === cellTypes.OPEN) {
        grid[coord.y][coord.x] = cellTypes.TOWER;
        console.log(getPath(enemyEnterCoord));
        if (getPath(enemyEnterCoord).length === 0) {
            grid[coord.y][coord.x] = cellTypes.OPEN;  // reset to open since this blocks a path from the entrance
        } else {
            scene.Towers.SandBags.create(scene.Towers.SandBags.Sand(scene, coord));
        }

    }
}

function selectTower(scene) {
    console.log("select");
}

function updateMarker(scene) {
    const coord = {x: Math.floor(scene.input.activePointer.worldX / cellSize.width), y: Math.floor(scene.input.activePointer.worldY / cellSize.height)}
    scene.cursor.x = coord.x * cellSize.width;
    scene.cursor.y = coord.y * cellSize.height;

    if (scene.input.mousePointer.isDown) {
        // console.log(coord);
        if (coord.y < playArea.height ) {
            placeTower(scene, coord);
        } else if (coord.y >= playArea.height && coord.y < playArea.height + menuArea.height) {
            selectTower(scene, coord);
        }
        // switch (grid[coord.y][coord.x]) {
        //     case cellTypes.WALL:
        //         console.log("wall");
        //         break;
        //     case cellTypes.TOWER:
        //         console.log("TOWER");
        //         break;
        //     case cellTypes.OPEN:
        //         console.log("OPEN");
        //         break;
        //     case cellTypes.BASE:
        //         console.log("BASE");
        //         break;
        //     case cellTypes.MENU_SAND:
        //         console.log("MENU_SAND");
        //         break;
        //     case cellTypes.MENU_MG:
        //         console.log("MENU_MG");
        //         break;
        //     case cellTypes.MENU_CANNON:
        //         console.log("MENU_CANNON");
        //         break;
        //
        // }
        // map.putTile(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
        // map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);
    }

}






/**
 * A closure creating a Enemy.
 * @param sprite The sprite for this enemy. The enemy will move this sprite.
 * @param waveIndex The position in the wave used to space the enemies out.
 * @param moveSpeed This enemies move speed.
 * @param healthPoints This enemies starting health points.
 * @param onDeath A call back that will be called on the death of this Enemy.
 * @param onBase
 * @returns {{damage: function(number), move: function, sprite: *}}
 * @constructor
 */
function Enemy(sprite, waveIndex, moveSpeed, healthPoints, onDeath, onBase) {
    let pathPoints;
    let moveIdx = 0;
    let atBase = false;
    const spriteRotation = sprite.rotation;  // should be passed in facing right
    let hp = healthPoints;
    let alive = true;
    let waveWaitDur = waveSpacingDur * waveIndex;

    function move() {
        if (waveWaitDur > 0) {
            waveWaitDur--;
            if (waveWaitDur === 0) {
                // set the sprite to the correct position
                sprite.x = enemyEnterCoord.x * cellSize.width;
                sprite.y = enemyEnterCoord.y * cellSize.height;
            } else {
                return true;
            }
        }
        if (!pathPoints) {
            pathPoints = getPathPoints(getSpriteCoord());
        }
        if (!atBase) {
            const gx = Phaser.Math.Interpolation.CatmullRom(pathPoints.x, moveIdx);
            const gy = Phaser.Math.Interpolation.CatmullRom(pathPoints.y, moveIdx);
            // console.log(px, py);
            const newX = gx * cellSize.width + (cellSize.width / 2);
            const newY = gy * cellSize.height + (cellSize.width / 2);
            const angle = Phaser.Math.Angle.Between(sprite.x, sprite.y, newX, newY);
            sprite.rotation = spriteRotation + angle;
            sprite.x = newX;
            sprite.y = newY;
            moveIdx += moveSpeed;
            // console.log(moveIdx);
            checkAtBase(gx, gy);
        } else {
            // base loses a life
        }
    }
    
    function getSpriteCoord() {
        return {x: Math.floor(sprite.x / cellSize.width), y: Math.floor(sprite.y / cellSize.height)}
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

    /**
     * Reduce this enemies health
     * @param damageAmount The number of hp to deduct
     * @returns {boolean|undefined} True if damage taken; false if already dead; undefined if damaged and is now dead
     */
    function damage(damageAmount) {
        if (!alive) return false;  // return false if the enemy is already dead
        hp -= damageAmount;  // damage the enemy
        if (isDead()) {
            alive = false;
            onDeath();
            return undefined;  // return undefined if the enemy is now dead
        }
        return true;  // return true if damage taken
    }

    function isDead() {
        return (hp < 0);
    }

    return {sprite, move, damage}
}

// Update
function Tower(sprite, range, damage, fireRate) {
    let targets = [];  // list of all enemies in range
    let target;  // the current enemy being targeted

    /**
     * Goes through all the given enemies and stores them if in range
     * @param enemies All of the Enemy objects
     */
    function resetTargets(enemies) {
        targets = enemies.filter(isInRange);
    }

    /**
     * Determine if the given enemy is within this towers range
     * @param enemy
     * @returns {boolean} True when in range, else false
     */
    function isInRange(enemy) {
        return Phaser.Math.Distance.Between(sprite.x, sprite.y, enemy.sprite.x, enemy.sprite.y) < range;
    }

    /**
     * Confirm that the current target is in range and non-null
     * @author: jk
     * @returns {boolean} True when confirmed, else false.
     */
    function confirmTarget() {
        if (!target && target.alive) {
            if (!targets) {  // if no current target get the next one in range
                for (let i = 0; i < targets.length; i++) {
                    if (isInRange(targets[i]) && targets[i].alive) {
                        target = targets[i];
                        targets.splice(0, i);  // remove all enemies before the one found
                        break;
                    }
                }
            }
        }
        return !!target;
    }

    /**
     * Inflict damage on the target. Handels cases where the target is already dead or is null by finding a new one.
     * @returns {boolean}
     */
    function shoot() {
        const target = target;  // store the target in case the property changes
        if (confirmTarget()) {
            switch(target.damage(damage)) {
                case false:
                    return shoot();  // bad target so try again
                case true:
                    // do nothing
                    return true;
                case undefined:
                    targets.splice(targets.indexOf(target), 1);  // remove the enemy from the targets
                    return true;
            }
        }
        return false; // no targets
    }

    return {sprite, shoot, resetTargets};
}


// ENEMIES //


function Truck(events) {
    /**
     * Create the enemy.
     * @param sprite The sprite the enemy will use.
     * @param waveIndex The position in the wave used to space the enemies out.
     * @returns {{damage: (function(number)), move: Function, sprite: *}}
     */
    function create(sprite, waveIndex) {
        return Enemy(sprite, waveIndex, 0.003, 75, events.onDeath, events.onBase);
    }

    function Truck3b(scene) {
        const truck = scene.add.image(offScreenCoord.x, offScreenCoord.y, "truck3b");
        truck.angle = 90;
        return truck;
    }

    return {create, Truck3b};
}


// TOWERS //

function SandBag() {
    /**
     * Create the Tower at the coordinates.
     * @returns {{resetTargets: *, sprite: *, shoot: *}}
     * @param {Phaser.GameObjects.Image} sprite The sprite to use
     */
    function create(sprite) {
        return Tower(sprite, 0.003, 75, 1);
    }

    /**
     * Create the Tower at the coordinates.
     * @param scene The game object.
     * @param coord The coordinates of the cell to place at.
     * @returns {Phaser.GameObjects.Image} The sprite.
     */
    function Sand(scene, coord) {
        return scene.add.image(coord.x * cellSize.width, coord.y * cellSize.height, "sand").setOrigin(0, 0);
    }

    return {create, Sand}
}


// Add scene to list of scenes
myGame.scenes.push(gamePlayState);