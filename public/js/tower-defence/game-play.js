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
        this.pause = false;

        this.score = 0;
        this.money = 400;
        this.lives = 10;

        // Create objects
        console.log("GamePlay");
        // const pistol = scene.add.image(250, 300, "pistol");
        const station = scene.add.image((btmLeft.x + 1) * cellSize.width, (btmLeft.y) * cellSize.height, "station");
        initFromGrid(scene);  // add bricks

        scene.enemies = [];
        scene.towers = [];
        // Enemy types
        function removeEnemys(enemy) {
            scene.enemies.forEach((enemy, idx) => {
                if (!enemy.isAlive()) {
                    scene.enemies.splice(idx, 1);
                }
            });
            console.log(scene.enemies);
        }
        const enemy_events = {onBase: () => {
                console.log('-1 life');
                removeEnemys();
                return scene;
            }, onDeath: () => {
                console.log('-1 Enemy');
                removeEnemys();
                return scene;
            }};
        scene.EnemyUnits = {Trucks: Truck(enemy_events, scene)};
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

        // scene.addTruck3b(1);
        // scene.addSandBag({x: 1, y: 1});

        // scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), 2));
        // scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), 3));
        // scene.enemies.push(scene.EnemyUnits.Trucks.create(scene.EnemyUnits.Trucks.Truck3b(scene), 4));

        // cursor
        this.cursor = this.add.graphics();
        this.cursor.lineStyle(2, 0x000000, 1);
        this.cursor.strokeRect(0, 0, 40, 40);

        // wave values
        this.waveIdx = 0;
        this.waveAmount = 3;
        this.spacingChoices = [40, 30, 20, 15];

        // ui text
        this.waveText = scene.add.text(0, 0, `Wave: ${this.waveIdx}`, {fontSize: 22, color: "#000000", backgroundColor: "#ffffff"});
        this.livesText = scene.add.text(0, 30, `Lives: ${this.lives}`, {fontSize: 22, color: "#000000", backgroundColor: "#ffffff"});
        this.scoreText = scene.add.text(160, 0, `Score: ${this.score}`, {fontSize: 22, color: "#000000", backgroundColor: "#ffffff"});
        this.moneyText = scene.add.text(160, 30, `Money: $${this.money}`, {fontSize: 22, color: "#000000", backgroundColor: "#ffffff"});

        const uiContainer = scene.add.container((playArea.width - 9) * cellSize.width, (playArea.height - 1) * cellSize.height);
        uiContainer.add(this.scoreText);
        uiContainer.add(this.moneyText);
        uiContainer.add(this.waveText);
        uiContainer.add(this.livesText);

        this.sandText = scene.add.text(0, 0, `Sandbag\n$${scene.Towers.SandBags.price}`, {fontSize: 12, color: "#ffffff", backgroundColor: "#000000"});
        this.mgText = scene.add.text(cellSize.width , 0, `Machine Gun\n$${scene.Towers.MachineGuns.price}`, {fontSize: 12, color: "#ffffff", backgroundColor: "#000000"});
        this.cannonText = scene.add.text(cellSize.width * 2, 0, `Cannon\n$${scene.Towers.Cannons.price}`, {fontSize: 12, color: "#ffffff", backgroundColor: "#000000"});

        const towerUiContainer = scene.add.container(6 * cellSize.width, (playArea.height - 1) * cellSize.height);
        towerUiContainer.add(this.sandText);
        towerUiContainer.add(this.mgText);
        towerUiContainer.add(this.cannonText);

        scene.pauseKey = scene.input.keyboard.addKey("P");
        scene.prevPauseDown = false;
        scene.gameover = false;

    },

    update: function() {
        const scene = this;
        if (scene.pauseKey.isDown) {
            scene.prevPauseDown = true;
        }
        if (scene.pauseKey.isUp && scene.prevPauseDown) {
            scene.pause = !scene.pause;
            scene.prevPauseDown = false;
        }
        if (scene.pause || scene.gameover) return;
        if (scene.lives <= 0) {
            scene.gameover = true;
            const scoreModel = $("#gameScoreFormModal");
            attachHeading(`Score: ${scene.score.toFixed(0)}`);
            scoreModel.on("hidden.bs.modal", () => {
                scene.scene.start();
                resetGrid();
            });
            attachSubmit({score: scene.score}, () => {
                scoreModel.modal("hide");
            });
            scoreModel.modal("show");  // user jQuery to show the modal
        }
        // console.log(scene.enemies);
        if (scene.enemies.length === 0) {
            if (this.waveIdx > 10) {
                waveSpacingDur = this.spacingChoices[Math.floor(Math.random() * this.spacingChoices.length + (this.waveIdx / 5)) % this.spacingChoices.length];
            }
            this.waveIdx++;
            if (this.waveIdx % 2 === 0) {
                this.waveAmount += 1;
            }
            for (let i = 0; i < this.waveAmount; i++) {
                scene.addTruck3b(i);
            }
        }
        updateUiText(scene);
        updateCursor(scene);
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

function updateUiText(scene) {
    scene.waveText.setText(`Wave: ${scene.waveIdx}`);
    scene.livesText.setText(`Lives: ${scene.lives}`);
    scene.scoreText.setText(`Score: ${scene.score}`);
    scene.moneyText.setText(`Money: $${scene.money}`);
}


function placeTower(scene, coord) {
    console.log(scene);
    if (scene.menuSelection && grid[coord.y][coord.x] === cellTypes.OPEN && scene.menuSelection.cost <= scene.money) {
        grid[coord.y][coord.x] = cellTypes.TOWER;
        if (getPath(enemyEnterCoord).length === 0) {
            grid[coord.y][coord.x] = cellTypes.OPEN;  // reset to open since this blocks a path from the entrance
        } else if (scene.menuSelection) {
            scene.money -= scene.menuSelection.cost;
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
            scene.menuSelection = {type: cellTypes.MENU_SAND, cost: scene.Towers.SandBags.price, add: scene.addSandBag};
            break;
        case cellTypes.MENU_MG:
            scene.menuSelection = {type: cellTypes.MENU_MG, cost: scene.Towers.MachineGuns.price, add: scene.addMachineGun};
            break;
        case cellTypes.MENU_CANNON:
            scene.menuSelection = {type: cellTypes.MENU_CANNON, cost: scene.Towers.Cannons.price, add: scene.addCannon};
            break;
        default:
            clearTowerSelection(scene);
            break;
    }

}

function updateCursor(scene) {
    const coord = {x: Math.floor(scene.input.activePointer.worldX / cellSize.width), y: Math.floor(scene.input.activePointer.worldY / cellSize.height)};
    scene.cursor.x = coord.x * cellSize.width;
    scene.cursor.y = coord.y * cellSize.height;

    if (scene.input.mousePointer.isDown) {
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
 * @param scene
 * @returns {{damage: function(number), move: function, sprite: *}}
 * @constructor
 */
function Enemy(sprite, waveIndex, moveSpeed, healthPoints, onDeath, onBase, scene) {
    let pathPoints;
    let moveIdx = 0;
    let atBase = false;
    const spriteRotation = sprite.rotation;  // should be passed in facing right
    let hp = healthPoints;
    let alive = true;
    let waveWaitDur = waveSpacingDur * waveIndex + wavePauseTime;
    let healthBar;
    let healthBarBg;

    function move() {
        if (atBase || !alive) return false;  // halt movement
        if (waveWaitDur >= 0) {
            waveWaitDur--;
            if (waveWaitDur < 0) {
                // set the sprite to the correct position
                createHeathBar();
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
            updateHealthBarPos();
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
            alive = false;
            die(onBase());
        }
    }

    function createHeathBar() {
        healthBarBg = scene.add.graphics();
        healthBarBg.fillStyle(0x000000, 1);
        healthBarBg.fillRect(0, 0, cellSize.width, 6);
        healthBar = scene.add.graphics();
        healthBar.fillStyle(0x00ff00, 1);
        healthBar.fillRect(0, 0, cellSize.width, 6);
    }

    function updateHealthBarPos() {
        healthBar.x = sprite.x - (cellSize.width / 2);
        healthBar.y = sprite.y - (cellSize.height / 2);
        healthBarBg.x = sprite.x - (cellSize.width / 2);
        healthBarBg.y = sprite.y - (cellSize.height / 2);
    }

    function updateHealthBarHealth() {
        if (!healthBar) return;
        healthBar.scaleX = (hp > 0) ? (hp / healthPoints) : 0;
        if (healthBar.scaleX < .6 && healthBar.scaleX > .3) {
            healthBar.fillStyle(0xeeee00, 1);
            healthBar.fillRect(0, 0, cellSize.width, 6);
        } else if (healthBar.scaleX < .3) {
            healthBar.fillStyle(0xff0000, 1);
            healthBar.fillRect(0, 0, cellSize.width, 6);
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
        updateHealthBarHealth();
        if (isDead()) {
            alive = false;
            die(onDeath());
            return undefined;  // return undefined if the enemy is now dead
        }
        return true;  // return true if damage taken
    }

    function die(scene) {
        if (atBase) {
            scene.lives -= 1;
        } else {
            scene.score += getScoreValue();
            scene.money += getMoneyValue();
        }
        let fadeTween = scene.tweens.add({
            targets: [sprite, healthBar, healthBarBg],
            alpha: { from: 1, to: 0 },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0,            // -1: infinity
            yoyo: false,
            onComplete: () => {
                sprite.destroy();
                healthBar.destroy();
                healthBarBg.destroy();
            }
        });
    }

    function isDead() {
        return (hp < 0);
    }
    
    function isAlive() {
        return alive;
    }

    function getScoreValue() {
        return 4;
    }

    function getMoneyValue() {
        return Math.round(healthPoints * moveSpeed * 4 * (1 + difInc));
    }

    return {sprite, move, damage, isAlive};
}

// Update
function Tower(sprite, range, damage, fireRate) {
    let targets = [];  // list of all enemies in range
    let target;  // the current enemy being targeted
    let shootIdx = 0;
    const spriteRotation = sprite.rotation;  // should be passed in facing right


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
        if (!(target && target.isAlive() && isInRange(target))) {  // if no current target get the next one in range
            for (let i = 0; i < targets.length; i++) {
                if (isInRange(targets[i]) && targets[i].isAlive()) {
                    target = targets[i];
                    targets.splice(0, i);  // remove all enemies before the one found
                    break;
                }
            }
        }
        return target && target.isAlive() && isInRange(target);
    }

    /**
     * Inflict damage on the target. Handels cases where the target is already dead or is null by finding a new one.
     * @returns {boolean}
     */
    function shoot() {
        if (shootIdx === 0 && confirmTarget()) {
            faceTarget();
            switch(target.damage(damage)) {
                case false:
                    console.log("bad target");
                    shootIdx = 0;
                    return false;  // bad target so try again next update
                case true:
                    shootIdx = fireRate;
                    return true;
                case undefined:
                    targets.splice(targets.indexOf(target), 1);  // remove the enemy from the targets
                    shootIdx = 0;
                    return true;
            }
        } else {
            if (shootIdx > 0) {
                shootIdx--;
            } else if (shootIdx < 0) {
                shootIdx = fireRate;
            }
        }
        return false; // no targets
    }

    function faceTarget() {
        const angle = Phaser.Math.Angle.Between(sprite.x, sprite.y, target.sprite.x, target.sprite.y);
        sprite.rotation = spriteRotation + angle;
    }

    return {sprite, shoot, resetTargets};
}


// ENEMIES //


function Truck(events, scene) {
    /**
     * Create the enemy.
     * @param sprite The sprite the enemy will use.
     * @param waveIndex The position in the wave used to space the enemies out.
     * @returns {{damage: (function(number)), move: Function, sprite: *}}
     */
    function create(sprite, waveIndex) {
        return Enemy(sprite, waveIndex, 0.025 + (0.002 * scene.waveIdx * (difInc + 1)), 55 + (25 * scene.waveIdx * (difInc + 1) * (scene.towers.length / 3)), events.onDeath, events.onBase, scene);
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
    const price = 30;
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
        return scene.add.image(coord.x * cellSize.width + (cellSize.width / 2), coord.y * cellSize.height + (cellSize.height / 2), "sand").setOrigin(0.5, 0.5);
    }

    return {create, price, Sand}
}

function MachineGun() {
    const price = 160;
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
        return scene.add.image(coord.x * cellSize.width + (cellSize.width / 2), coord.y * cellSize.height + (cellSize.height / 2), "machine gun").setOrigin(0.5, 0.5).setRotation(Math.PI / 2);
    }

    return {create, price, MachineGun}
}

function Cannon() {
    const price = 280;
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
        return scene.add.image(coord.x * cellSize.width + (cellSize.width / 2), coord.y * cellSize.height + (cellSize.height / 2), "cannon").setOrigin(0.5, 0.5).setRotation(Math.PI / 2);
    }

    return {create, price, Cannon}
}

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);