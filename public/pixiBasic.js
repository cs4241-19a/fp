import * as PIXI from 'pixi.js';

//init basics
let app = new PIXI.Application({ backgroundColor: 0x00FFFF });
const loader = new PIXI.Loader();
document.body.appendChild(app.view);
let paw = PIXI.Sprite.from('images/cat.png');
let dog = PIXI.Sprite.from('images/dog.png');
let activeChar = paw;
let tics = 0;
let time = 0;
let start = false;
let startText = new PIXI.Text('Select a character to begin',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
app.stage.addChild(startText);
let count = 0;
let fallDone = true;

function resetPaw() {
    paw.x = app.screen.width / 2;
    paw.y = app.screen.height / 2;
    paw.vx = 0;
    paw.vy = 0;
}

function resetDog() {
    dog.x = app.screen.width / 2;
    dog.y = app.screen.height / 2;
    dog.vx = 0;
    dog.vy = 0;
}

document.getElementById("dogBut").addEventListener("click", function(){
    start = true;
    activeChar.visible = false;
    resetDog();
    activeChar = dog;
    app.stage.addChild(activeChar);
    startText.visible = false;
    activeChar.visible = true;
});

document.getElementById("pawBut").addEventListener("click", function(){
    start = true;
    activeChar.visible = false;
    resetPaw();
    activeChar = paw;
    app.stage.addChild(activeChar);
    startText.visible = false;
    activeChar.visible = true;
});

// animation loop running at 60 fps
app.ticker.add(function(delta) {
    if(start) {
        if (up.isDown && count < 60 && fallDone) {
            activeChar.vy = -2;
            count++;
        } else {
            activeChar.vy = 2;
            if (count > 0) {
                count--;
                fallDone = false;
            } else if (count == 0) {
                fallDone = true;
            }
        }
        if (activeChar.x + activeChar.vx > 0 && activeChar.x + activeChar.width + activeChar.vx < app.screen.width) {
            activeChar.x += activeChar.vx;
        }
        if (activeChar.y + activeChar.vy > 0 && activeChar.y + activeChar.height + activeChar.vy < app.screen.height) {
            activeChar.y += activeChar.vy;
        }
        tics++;
        if (tics % 60 == 0) {
            time++;
            document.getElementById("timer").innerHTML = "time: " + time.toString();
        }
    }
});

//create key handler
function keyboard(value) {
    'use strict';
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    key.downHandler = function (event) {
        if (event.key === key.value) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };
    key.upHandler = function (event) {
        if (event.key === key.value) {
            if (key.isDown && key.release){
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    document.addEventListener(
        "keydown", downListener, false
    );
    document.addEventListener(
        "keyup", upListener, false
    );
    key.unsubscribe = function(){
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };
    return key;
}

//setup input keys
let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown"),
    w = keyboard("w"),
    a = keyboard("a"),
    s = keyboard("s"),
    d = keyboard("d"),
    j = keyboard("j");

//key functions
left.press = function(){
    'use strict'
    activeChar.vx += -5;
}
right.press = function(){
    'use strict'
    activeChar.vx += 5;
}
right.release = function(){
    'use strict'
    activeChar.vx = 0;
}
left.release = function(){
    'use strict'
    activeChar.vx = 0;
}