import * as PIXI from 'pixi.js';

let app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);
const loader = new PIXI.Loader(); // you can also create your own if you want
loader
    .add('cat', 'images/cat.png')

// //Aliases
// let Application = PIXI.Application,
//     Container = PIXI.Container,
//     loader = PIXI.Loader(),
//     resources = PIXI.Loader.resources,
//     TextureCache = PIXI.utils.TextureCache,
//     Sprite = PIXI.Sprite;
//Create a Pixi Application
// let app = new Application({
//         width: 256,
//         height: 256,
//         antialiasing: true,
//         transparent: false,
//         resolution: 1
//     }
// );
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// create a new Sprite from an image path
let paw = PIXI.Sprite.from('images/cat.png');
let dog = PIXI.Sprite.from('images/dog.png');


// center the sprite's anchor point
paw.anchor.set(0.5);

// move the sprite to the center of the screen
paw.x = app.screen.width / 2;
paw.y = app.screen.height / 2;

// center the sprite's anchor point
dog.anchor.set(0.5);

// move the sprite to the center of the screen
dog.x = app.screen.width / 4;
dog.y = app.screen.height / 4;

app.stage.addChild(paw);
app.stage.addChild(dog);

// Listen for animate update
app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    // paw.rotation += 0.1 * delta;

});


function keyboard(value) {
    'use strict';
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
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

    //The `upHandler`
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

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    document.addEventListener(
        "keydown", downListener, false
    );
    document.addEventListener(
        "keyup", upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}

let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown"),
    w = keyboard("w"),
    a = keyboard("a"),
    s = keyboard("s"),
    d = keyboard("d");


left.press = function(){
    'use strict'
    document.getElementById("key").innerHTML = "left";
    paw.x += -5;
}
right.press = function(){
    'use strict'
    document.getElementById("key").innerHTML = "right";
    paw.x += 5;
}
up.press = function(){
    'use strict'
    document.getElementById("key").innerHTML = "up";
    paw.y += -5;
}
down.press = function(){
    'use strict'
    document.getElementById("key").innerHTML = "down";
    paw.y += 5;
}

w.press = function(){
    'use strict'
    document.getElementById("key2").innerHTML = "w";
    dog.y += -5;
}
a.press = function(){
    'use strict'
    document.getElementById("key2").innerHTML = "a";
    dog.x += -5;
}
s.press = function(){
    'use strict'
    document.getElementById("key2").innerHTML = "s";
    dog.y += 5;
}
d.press = function(){
    'use strict'
    document.getElementById("key2").innerHTML = "d";
    dog.x += 5;
}