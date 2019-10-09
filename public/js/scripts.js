const updatePlayer = function() {

    // Add logic here for gamestate and/or score
    const pObj = {
        attack: 7,
        crit: 0.11,
        helpers: 0
    };

    const eObj = {
        health: 70,
        filepath: "../img/ganondorf.png",
        tier: 2
    };

    const currentState = {
        PlayerObj: pObj,
        EnemyObj: eObj
    };

    const updatedUser = {
        username: document.getElementById('current-username').value,
        score: 100, // CHANGE HERE
        gameState: currentState // CHANGE HERE
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

    let HTMLDiv = document.getElementById("leaderboard");

    HTMLDiv.innerHTML = '<tr>\n' + '<th>Username</th>\n' +
        '<th>Score</th>\n' + '</tr>';

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        let row = '<tr>\n';
        row += (`<td> ${currentUser.username} </td>\n`);
        row += (`<td> ${currentUser.score} </td>\n`);
        row += '</tr>';
        HTMLDiv.innerHTML += row;
    }

    return false;
};

const login = function (e) {
    //debugger;
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

const animateCSS = function (element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd);
};

const pixiInit = function (){
    const canvas = document.getElementById("game-canvas");
    const container = document.getElementById('main-container');

    const game = new PIXI.Application({
        view: canvas,
        width: window.innerWidth,
        height: 750,
        backgroundColor: 0x333333,
        antialias: true
    });

    console.log("wtf is happening");

    const renderer = new PIXI.Renderer({});

    const enemyTexture = PIXI.Texture.from("../img/bokoblin.png");
    const enemy = new PIXI.Sprite(enemyTexture);

    enemy.x = (game.renderer.width * 5) / 6;
    enemy.y = game.renderer.height / 2;
    enemy.anchor.x = 0.5;
    enemy.anchor.y = 0.5;

    const playerTexture = PIXI.Texture.from("../img/bomb.png");
    const player = new PIXI.Sprite(playerTexture);

    player.x = game.renderer.width / 6;
    player.y = game.renderer.height / 2;
    player.anchor.x = 0.5;
    player.anchor.y = 0.5;

    game.stage.addChild(enemy);
    game.stage.addChild(player);
    game.ticker.add(animate);

    function animate() {
        enemy.rotation += 0.01;
        player.rotation -= 0.01;
    }
};


let damage = 10;  // placeholder damage

const mainClick = function () {
    const enemyHealth = document.getElementById('health');
    const enemyImg = document.getElementById('enemy-image');
    const buttonContainer = document.querySelector('.button-container');

    if(enemyHealth.value > 0){
        enemyHealth.value -= damage;
    } else {
        enemyHealth.value = 100;
        enemyImg.src = findEnemy(2);
    }

    console.log("Hello");
};