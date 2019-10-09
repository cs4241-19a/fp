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
        console.log(scene);
        scene.menuSelection = null;  // set to {type, add} when has a value of types cellTypes, function

        // Create objects
        console.log("GamePlay");
        // const pistol = scene.add.image(250, 300, "pistol");
        const station = scene.add.image((btmLeft.x + 1) * cellSize.width, (btmLeft.y) * cellSize.height, "station");
        initFromGrid(scene);  // add bricks

        scene.enemies = [];
        scene.towers = [];
        // Enemy types
        function removeEnemy(enemy) {
            scene.enemies.slice(scene.enemies.indexOf(enemy), 1);
        }
        const enemy_events = {onBase: () => {
                console.log('-1 life');
                removeEnemy();
                return scene;
            }, onDeath: () => {
                console.log('-1 Enemy');
                removeEnemy();
                return scene;
            }};
        scene.EnemyUnits = {Trucks: Truck(enemy_events)};
        scene.Towers = {SandBags: SandBag(), MachineGuns: MachineGun(), Cannons: Cannon()};

        scene.addTruck3b = function (waveIndex) {
            scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), waveIndex));
        };

        scene.addSandBag = function (coord) {
            scene.towers.push(scene.Towers.SandBags.create(scene.Towers.SandBags.Sand(scene, coord)));
        };
        scene.addMachineGun = function (coord) {
            scene.towers.push(scene.Towers.MachineGuns.create(scene.Towers.MachineGuns.MachineGun(scene, coord)));
        };
        scene.addCannon = function (coord) {
            scene.towers.push(scene.Towers.Cannons.create(scene.Towers.Cannons.Cannon(scene, coord)));
        };

        // for (let i = 0; i < 10; i++) scene.addTruck3b(i * 10);
        scene.addTruck3b(1);
        // scene.addSandBag({x: 1, y: 1});

        // scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), 2));
        // scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), 3));
        // scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), 4));

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
        scene.towers.forEach(tower => {
            tower.resetTargets(scene.enemies);
            tower.shoot();
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
    if (scene.menuSelection && grid[coord.y][coord.x] === cellTypes.OPEN) {
        grid[coord.y][coord.x] = cellTypes.TOWER;
        if (getPath(enemyEnterCoord).length === 0) {
            grid[coord.y][coord.x] = cellTypes.OPEN;  // reset to open since this blocks a path from the entrance
        } else if (scene.menuSelection) {
            scene.menuSelection.add(coord);
        }
    }
}

function clearTowerSelection(scene) {
    scene.menuSelection = null;
}

function selectTower(scene, coord) {
    switch (grid[coord.y][coord.x]) {
        case cellTypes.MENU_SAND:
            scene.menuSelection = {type: cellTypes.MENU_SAND, add: scene.addSandBag};
            break;
        case cellTypes.MENU_MG:
            scene.menuSelection = {type: cellTypes.MENU_MG, add: scene.addMachineGun};
            break;
        case cellTypes.MENU_CANNON:
            scene.menuSelection = {type: cellTypes.MENU_CANNON, add: scene.addCannon};
            break;
        default:
            clearTowerSelection(scene);
            break;
    }

}

function updateMarker(scene) {
    const coord = {x: Math.floor(scene.input.activePointer.worldX / cellSize.width), y: Math.floor(scene.input.activePointer.worldY / cellSize.height)}
    scene.cursor.x = coord.x * cellSize.width;
    scene.cursor.y = coord.y * cellSize.height;

    if (scene.input.mousePointer.isDown) {
        console.log(scene.menuSelection);
        if (coord.y < playArea.height ) {
            placeTower(scene, coord);
        } else if (coord.y >= playArea.height && coord.y < playArea.height + menuArea.height) {
            selectTower(scene, coord);
        }
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
        if (atBase || !alive) return false;  // halt movement
        if (waveWaitDur >= 0) {
            waveWaitDur--;
            if (waveWaitDur < 0) {
                // set the sprite to the correct position
                sprite.x = enemyEnterCoord.x * cellSize.width;
                sprite.y = enemyEnterCoord.y * cellSize.height;
            } else {
                return true;
            }
        }
        const coord = getSpriteCoord();  // coords at the beginning of this update call (after setting init pos above)
        let newCoordTrans;
        let newPathCoord;
        if (!pathPoints) {
            pathPoints = getPathPoints(coord);
            console.log(pathPoints)
        }
        if (pathPoints) {
            // CatmullRom
            newCoordTrans = {x: Phaser.Math.Interpolation.CatmullRom(pathPoints.x, moveIdx), y: Phaser.Math.Interpolation.CatmullRom(pathPoints.y, moveIdx)};
            // x and y paths can have different lengths
            const pathIdxX = (moveIdx < 1) ? Math.floor(pathPoints.x.length * moveIdx) : pathPoints.x.length - 1;
            const pathIdxY = (moveIdx < 1) ? Math.floor(pathPoints.y.length * moveIdx) : pathPoints.y.length - 1;
            newPathCoord = {x: pathPoints.x[pathIdxX], y: pathPoints.y[pathIdxY]};
            // TODO: Recalculate path if now is occupied
            // if (grid[newPathCoord.y][newPathCoord.x] !== cellTypes.OPEN || grid[newPathCoord.y][newPathCoord.x] !== cellTypes.BASE) {  // if moving into a new coord and it is occupied
            //     pathPoints = getPathPoints();
            // }
        }
        if (!atBase) {
            const newPos = {x: newCoordTrans.x * cellSize.width + (cellSize.width / 2), y: newCoordTrans.y * cellSize.height + (cellSize.width / 2)};
            const angle = Phaser.Math.Angle.Between(sprite.x, sprite.y, newPos.x, newPos.y);
            sprite.rotation = spriteRotation + angle;
            sprite.x = newPos.x;
            sprite.y = newPos.y;
            moveIdx += (moveSpeed * 2 / (pathPoints.x.length + pathPoints.y.length) );
            checkAtBase(newPathCoord);
        }
    }
    
    function getSpriteCoord() {
        return {x: Math.floor(sprite.x / cellSize.width), y: Math.floor(sprite.y / cellSize.height)}
    }

    /**
     * Check if at the base
     * @param coord Coordinates from path
     */
    function checkAtBase(coord) {
        if (coord.x <= baseEntrance.x && coord.y >= baseEntrance.y) {
            atBase = true;
            onBase();
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
            die(onDeath());
            return undefined;  // return undefined if the enemy is now dead
        }
        return true;  // return true if damage taken
    }

    function die(scene) {
        // sprite.destroy();
        let fadeTween = scene.tweens.add({
            targets: sprite,
            alpha: { from: 1, to: 0.5 },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0,            // -1: infinity
            yoyo: false,
            onComplete: () => sprite.destroy()
        });
    }

    function isDead() {
        return (hp < 0);
    }
    
    function isAlive() {
        return alive;
    }

    return {sprite, move, damage, isAlive}
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
        return Phaser.Math.Distance.Between(sprite.x / cellSize.width, sprite.y / cellSize.height, enemy.sprite.x / cellSize.width, enemy.sprite.y / cellSize.height) < range;
    }

    /**
     * Confirm that the current target is in range and non-null
     * @author: jk
     * @returns {boolean} True when confirmed, else false.
     */
    function confirmTarget() {
        if (!(target && target.isAlive())) {  // if no current target get the next one in range
            for (let i = 0; i < targets.length; i++) {
                if (isInRange(targets[i]) && targets[i].isAlive()) {
                    target = targets[i];
                    targets.splice(0, i);  // remove all enemies before the one found
                    break;
                }
            }
        }
        return target && target.isAlive();
    }

    /**
     * Inflict damage on the target. Handels cases where the target is already dead or is null by finding a new one.
     * @returns {boolean}
     */
    function shoot() {
        if (confirmTarget()) {
            switch(target.damage(damage)) {
                case false:
                    console.log("bad target");
                    return false;  // bad target so try again next update
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
        return Enemy(sprite, waveIndex, 0.06, 75, events.onDeath, events.onBase);
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
        return Tower(sprite, 0, 0, 0);
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

function MachineGun() {
    /**
     * Create the Tower at the coordinates.
     * @returns {{resetTargets: *, sprite: *, shoot: *}}
     * @param {Phaser.GameObjects.Image} sprite The sprite to use
     */
    function create(sprite) {
        return Tower(sprite, 2, 5, 3);
    }

    /**
     * Create the Tower at the coordinates.
     * @param scene The game object.
     * @param coord The coordinates of the cell to place at.
     * @returns {Phaser.GameObjects.Image} The sprite.
     */
    function MachineGun(scene, coord) {
        return scene.add.image(coord.x * cellSize.width, coord.y * cellSize.height, "machine gun").setOrigin(0, 0);
    }

    return {create, MachineGun}
}

function Cannon() {
    /**
     * Create the Tower at the coordinates.
     * @returns {{resetTargets: *, sprite: *, shoot: *}}
     * @param {Phaser.GameObjects.Image} sprite The sprite to use
     */
    function create(sprite) {
        return Tower(sprite, 3, 20, 15);
    }

    /**
     * Create the Tower at the coordinates.
     * @param scene The game object.
     * @param coord The coordinates of the cell to place at.
     * @returns {Phaser.GameObjects.Image} The sprite.
     */
    function Cannon(scene, coord) {
        return scene.add.image(coord.x * cellSize.width, coord.y * cellSize.height, "cannon").setOrigin(0, 0);
    }

    return {create, Cannon}
}

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);