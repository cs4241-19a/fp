const updatePlayer = function(eHP, eSrc, etier) {
    const board = document.getElementById('scoreboard');
    const currtext = document.getElementById('currency-text');
    const lvlref = document.getElementById('level');
    const attref = document.getElementById('attack-cost');
    const critref = document.getElementById('crit-cost');
    let sc = parseInt(board.innerText);
    let go = parseInt(currtext.innerText);
    let lvl = parseInt(lvlref.innerText);
    let att = parseInt(attref.innerText);
    let crt = parseInt(critref.innerText);

    // Add logic here for gamestate and/or score
    const pObj = {
        attack: baseDamage,
        crit: baseCrit,
        level: lvl
    };

    const eObj = {
        health: eHP,
        filepath: eSrc,
        tier: etier
    };

    const currentState = {
        score: sc,
        currency: go,
        PlayerObj: pObj,
        EnemyObj: eObj,
        attackCost: att,
        critCost: crt
    };

    const updatedUser = {
        username: document.getElementById('current-username').value,
        gameState: currentState
    };

    const body = JSON.stringify(updatedUser);
    fetch( '/update', {
        method:'POST',
        body
    })
};

const viewLeaderboard = function() {
    document.getElementById('table').style.display = "flex";
    document.getElementById('back-button').style.display = "flex";
    document.getElementById('main-container').style.display = "none";
    document.getElementById('leaderboard-button').style.display = "none";
    document.getElementById('game-canvas').style.display = "none";

    fetchLeaderboard();
    return false;
};

const viewGame = function() {
    document.getElementById('table').style.display = "none";
    document.getElementById('back-button').style.display = "none";
    document.getElementById('game-canvas').style.display = "flex";
    document.getElementById('main-container').style.display = "flex";
    document.getElementById('leaderboard-button').style.display = "flex";
};

const fetchLeaderboard = async function() {
    const response = await fetch('/leaderboard', {method: 'GET'});
    const data = await response.json();
    const users = data.users;

    users.sort(function(a, b){return a.gameState.score - b.gameState.score});

    let HTMLDiv = document.getElementById("leaderboard");

    HTMLDiv.innerHTML = '<tr>\n' + '<th>Username</th>\n' +
        '<th>Score</th>\n' + '</tr>';

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[users.length - 1 - i];
        let row = '<tr>\n';
        row += (`<td> ${currentUser.username} </td>\n`);
        row += (`<td> ${currentUser.gameState.score} </td>\n`);
        row += '</tr>';
        HTMLDiv.innerHTML += row;
    }

    return false;
};

const login = function (e) {
    e.preventDefault();

    const loginInfo = {
        username: document.getElementById("login-username").value,
        password: document.getElementById("password").value
    };

    const body = JSON.stringify(loginInfo);
    fetch( '/login', {
        method:'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
    })
    .then( function( response ) {
        document.getElementById('main-container').style.display = "flex";
        document.getElementById('leaderboard-button').style.display = "flex";
        document.getElementById('login').style.display = "none";
        document.getElementById('current-username').value = loginInfo.username;
        pixiInit();
    });
};

// Front end stuff

function findEnemy(tier) {
    const random = Math.random();
    let filepath;

    if (tier === 1) {
        switch(true) {
            case random > 0.9:
                filepath = "../img/bokoblin.png";
                break;
            case (random > 0.8 && random <= 0.9):
                filepath = "../img/bomb.png";
                break;
            case (random > 0.7 && random <= 0.8):
                filepath = "../img/eggrobot.png";
                break;
            case (random > 0.6 && random <= 0.7):
                filepath = "../img/goomba.png";
                break;
            case (random > 0.5 && random <= 0.6):
                filepath = "../img/heartless.png";
                break;
            case (random > 0.4 && random <= 0.5):
                filepath = "../img/met.png";
                break;
            case (random > 0.3 && random <= 0.4):
                filepath = "../img/pacman-ghost.png";
                break;
            case (random > 0.2 && random <= 0.3):
                filepath = "../img/rattata.png";
                break;
            case (random > 0.1 && random <= 0.2):
                filepath = "../img/slime.png";
                break;
            case random <= 0.1:
                filepath = "../img/waddle-dee.png";
                break;
        }
    }
    if (tier === 2) {
        switch(true) {
            case random > 0.8:
                filepath = "../img/bowser-jr.png";
                break;
            case (random > 0.6 && random <= 0.8):
                filepath = "../img/charizard.png";
                break;
            case (random > 0.4 && random <= 0.6):
                filepath = "../img/shadow.png";
                break;
            case (random > 0.2 && random <= 0.4):
                filepath = "../img/zero.png";
                break;
            case random <= 0.2:
                filepath = "../img/zant.png";
                break;
        }
    }
    if (tier === 3) {
        switch(true) {
            case random > 0.67:
                filepath = "../img/bowser.png";
                break;
            case (random > 0.33 && random <= 0.67):
                filepath = "../img/ganondorf.png";
                break;
            case random <= 0.33:
                filepath = "../img/eggman.png";
                break;
        }
    }

    return filepath;
}

const pixiInit = async function () {

    const username = {
        username: document.getElementById("current-username").value
    };

    const body = JSON.stringify(username);

    const response = await fetch('/getGameState', {
        method: 'POST',
        body
    });
    const data = await response.json();
    const state = data.data;

    const canvas = document.getElementById("game-canvas");
    const container = document.getElementById('main-container');
    let enemyTier = 1;

    const game = new PIXI.Application({
        view: canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x333333,
        antialias: true
    });


    const renderer = new PIXI.Renderer({});

    let enemySrc = "../img/bokoblin.png";

    if (state.score != 0) {
        baseDamage = state.PlayerObj.attack;
        baseCrit = state.PlayerObj.crit;
        document.getElementById('crit-rate').innerText = baseCrit.toString();
        document.getElementById('scoreboard').innerText = state.score.toString();
        enemySrc = state.EnemyObj.filepath;
        document.getElementById('currency-text').innerText = state.currency.toString();
        document.getElementById('level').innerText = state.PlayerObj.level.toString();
        enemyTier = state.EnemyObj.tier;
        attackCost = state.attackCost;
        critCost = state.critCost;
        document.getElementById('crit-cost').innerText = state.critCost.toString();
        document.getElementById('attack-cost').innerText = state.attackCost.toString();
    }

    const enemyTexture = PIXI.Texture.from(enemySrc);
    const enemy = new PIXI.Sprite(enemyTexture);
    const enemyHealth = document.getElementById('health');

    if (state.score != 0) {
        enemyHealth.value = state.EnemyObj.health;
        enemyHealth.max = state.EnemyObj.health;
    }

    enemy.x = (game.renderer.width * 5) / 6;
    enemy.y = game.renderer.height / 2;
    let enemyInitialPosX = enemy.x;
    let enemyInitialPosY = enemy.y;
    enemy.anchor.x = 0.5;
    enemy.anchor.y = 0.5;

    const playerTexture = PIXI.Texture.from("../img/link.png");
    const player = new PIXI.Sprite(playerTexture);

    player.x = game.renderer.width / 6;
    player.y = game.renderer.height / 2;
    let playerInitialPosX = player.x;
    let playerInitialPosY = player.y;
    player.anchor.x = 0.5;
    player.anchor.y = 0.5;

    game.stage.addChild(enemy);
    game.stage.addChild(player);
    game.ticker.add(animate);
    game.ticker.add(enemyAnim);
    game.ticker.add(playerAnim);

    let anim = new PIXI.Graphics();
    let damageText = new PIXI.Text('0',{fontFamily : 'Arial', fontSize: 24, fill : 0xff0030, align : 'center'});
    let animCounter = 0;
    //damageText = damageAnim(damageText);
    anim = attackAnim(anim, enemy);

    game.stage.addChild(anim);
    game.stage.addChild(damageText);

    function animate() {

        if(attacking === false){
            anim.clear();
            damageText.visible = false;
        }

        else if(attacking === true ){
            anim = attackAnim(anim, enemy, critting);
            if(damageArray.length > 0){

                damageText = damageAnim(damageText, critting);

            }

            damageText.visible = true;
            damageText.position.y -= 5;
            damageText.position.x += getRandomInt(10) - 5;
            animCounter += 1;
        }
        if(animCounter > 10){
            attacking = false;
            critting = false;
            animCounter = 0;
        }

        if(!enemyHealth.value > 0){
            let newEnemy;
            let newEnemyHealth;
            enemyHealth.value = 0;
            updateCurrency(enemyHealth.max);
            attackCounter = 0;
            let levelRef = document.getElementById('level');

            switch (enemyTier) {

                case 1:
                    enemySrc = findEnemy(2);
                    newEnemy = PIXI.Texture.from(enemySrc);
                    enemy.texture = newEnemy;
                    newEnemyHealth = Math.floor(enemyHealth.max * 1.05) + getRandomInt(2 * enemyTier);
                    enemyHealth.max = newEnemyHealth;
                    enemyHealth.value = enemyHealth.max;
                    enemyTier = 2;
                    break;

                case 2:
                    enemySrc = findEnemy(3);
                    newEnemy = PIXI.Texture.from(enemySrc);
                    enemy.texture = newEnemy;
                    //enemyHealth.max += 30;
                    newEnemyHealth = Math.floor(enemyHealth.max * 1.07) + getRandomInt(4 * enemyTier);
                    enemyHealth.max = newEnemyHealth;
                    enemyHealth.value = enemyHealth.max;
                    enemyTier = 3;
                    break;

                case 3:
                    enemySrc = findEnemy(1);
                    newEnemy = PIXI.Texture.from(enemySrc);
                    enemy.texture = newEnemy;
                    newEnemyHealth = Math.floor(enemyHealth.max * 1.12) + getRandomInt(10 * enemyTier);
                    enemyHealth.max = newEnemyHealth;
                    enemyHealth.value = enemyHealth.max;
                    enemyTier = 1;
                    level = parseInt(levelRef.innerText) + 1;
                    levelRef.innerText = level.toString();
                    break;
            }
            updatePlayer(enemyHealth.value, enemySrc, enemyTier);
        }
    }

    function enemyAnim () {
        if(attacking === true && animCounter < 5){
            enemy.position.x += 3;
        }
        else if(animCounter >= 5){
            enemy.x -= 3;
        }
        else if(animCounter === 0){
            resetAnimation();
        }
    }

    function playerAnim () {
        if(attacking === true && animCounter < 5){
            player.position.x += 7;
        }
        else if(animCounter >= 5){
            player.x -= 2;
        }
        else if(animCounter === 0){
            resetAnimation();
        }
    }

    function resetAnimation(){
        enemy.x = enemyInitialPosX;
        enemy.y = enemyInitialPosY;
        damageText.position.x = enemyInitialPosX;
        damageText.position.y = enemyInitialPosY;
        player.x = playerInitialPosX;
        player.y = playerInitialPosY;
    }


    function damageAnimation() {
        if(attacking === true){

        }
    }
};


const damageUpgrade = function () {
    if (gold >= attackCost) {
        baseDamage += Math.floor(Math.sqrt(attackCost) * level);
        let currentCurrency = document.getElementById('currency-text');
        let costRef = document.getElementById('attack-cost');
        gold -= attackCost;
        attackCost *= 5;
        currentCurrency.innerText = gold.toString();
        costRef.innerText = attackCost.toString();
    }
};

const critUpgrade = function () {
    if (gold >= critCost) {
        baseCrit += (baseCrit == 0.00) ? 1.00 : Math.sqrt(baseCrit);
        let currentCurrency = document.getElementById('currency-text');
        let pop = document.getElementById('crit-rate');
        let costRef = document.getElementById('crit-cost');
        gold -= critCost;
        critCost *= 5;
        currentCurrency.innerText = gold.toString();
        pop.innerText = baseCrit.toFixed(2).toString();
        costRef.innerText = critCost.toString();
    }
};

const updateCurrency = function (enemyHealth) {
    let currentCurrency = document.getElementById('currency-text');
    let scoreboard = document.getElementById('scoreboard');
    pts = parseInt(scoreboard.innerText);
    gold = parseInt(currentCurrency.innerText);
    gold += enemyHealth / attackCounter;
    pts += enemyHealth / attackCounter;
    pts = Math.floor(pts);
    gold = Math.floor(gold);
    scoreboard.innerText = pts.toString();
    currentCurrency.innerText = gold.toString();
};


let baseDamage = 10;  // placeholder damage
let maxCrit = 50.00;
let baseCrit = 0.00;
let attackCounter = 0;
let attackCost = 10;
let critCost = 20;
let level = 1;
let gold = 0;
let pts = 0;
let attacking = false;
let critting = false;


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

const mainClick = function () {
    const enemyHealth = document.getElementById('health');
    const buttonContainer = document.querySelector('.button-container');
    let damageText = new PIXI.Text('0',{fontFamily : 'Arial', fontSize: 24, fill : 0xff0030, align : 'center'});

    attacking = true;

    if(enemyHealth.value > 0){
        let totalDamage = baseDamage;
        if(baseCrit >= maxCrit){
            baseCrit = maxCrit;
        }
        if(getRandomInt(100).toFixed(2) <= baseCrit){
            critting = true;
            totalDamage *= 2.5;
        }
        attackCounter += 1;
        enemyHealth.value -= totalDamage;
        damageText.text = totalDamage.toString();

        updateDamageText(totalDamage);
        //damageAnim(damageText);
    }
};

const attackAnim = function (animation, enemy, crit) {
    let enemyPos = enemy.position;

    if(crit === false) {
        animation.beginFill(0xFFFFFF, 0.5);
        animation.position.x = enemyPos.x - (100 + getRandomInt(250));
        animation.position.y = enemyPos.y - (getRandomInt(200));
        animation.bezierCurveTo(enemyPos.x - 100, enemyPos.y, enemyPos.x, enemyPos.y + 300, enemyPos.x, enemyPos.y);
        animation.endFill();
    }
    else {
        animation.beginFill(0xFF0000, 0.5);
        animation.position.x = enemyPos.x - (100 + getRandomInt(250));
        animation.position.y = enemyPos.y - (getRandomInt(200));
        animation.bezierCurveTo(enemyPos.x - 200, enemyPos.y + 100, enemyPos.x + 100, enemyPos.y + 100, enemyPos.x, enemyPos.y);
        animation.endFill();
    }

    return animation;
};

let damageArray = [];
const updateDamageText = function (damage){
    damageArray.push(damage);
};


const damageAnim = function (animation, crit){
    let damageText = new PIXI.Text('0',{fontFamily : 'Arial', fontSize: 40, fill : 0xff0030, align : 'center'});
    let damage = damageArray.pop();

    damageText = animation;

    animation.text = damage.toString();


    if(crit === false) {
        animation.style.fill = 0xFFFFFF;
        animation.style.fontSize = 40;
    }
    else {
        animation.style.fill = 0xFF0030;
        animation.style.fontSize = 60;
    }

    return animation;
};

