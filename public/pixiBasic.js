// function keyboard(value) {
//     'use strict';
//     let key = {};
//     key.value = value;
//     key.isDown = false;
//     key.isUp = true;
//     key.press = undefined;
//     key.release = undefined;
//     //The `downHandler`
//     key.downHandler = function (event) {
//         if (event.key === key.value) {
//             if (key.isUp && key.press) {
//                 key.press();
//             }
//             key.isDown = true;
//             key.isUp = false;
//             event.preventDefault();
//         }
//     };
//
//     //The `upHandler`
//     key.upHandler = function (event) {
//         if (event.key === key.value) {
//             if (key.isDown && key.release){
//                 key.release();
//             }
//             key.isDown = false;
//             key.isUp = true;
//             event.preventDefault();
//         }
//     };
//
//     //Attach event listeners
//     const downListener = key.downHandler.bind(key);
//     const upListener = key.upHandler.bind(key);
//
//     document.addEventListener(
//         "keydown", downListener, false
//     );
//     document.addEventListener(
//         "keyup", upListener, false
//     );
//
//     // Detach event listeners
//     key.unsubscribe = () => {
//         window.removeEventListener("keydown", downListener);
//         window.removeEventListener("keyup", upListener);
//     };
//
//     return key;
// }
//
// let left = keyboard("ArrowLeft"),
//     up = keyboard("ArrowUp"),
//     right = keyboard("ArrowRight"),
//     down = keyboard("ArrowDown");
//
// left.press = function () {
//     'use strict';
//     console.log("left");
//     document.getElementById("key").innerHTML = "left";
// };
// right.press = function () {
//     'use strict';
//     document.getElementById("key").innerHTML = "right";
// };
// up.press = function () {
//     'use strict';
//     document.getElementById("key").innerHTML = "up";
// };
// down.press = function () {
//     'use strict';
//     document.getElementById("key").innerHTML = "down";
// };


//
// function logKey(e) {
//     'use strict';
//     document.getElementById("key").innerHTML = "test";
//     //document.getElementById("key").innerHTML = e.code;
// }
// document.addEventListener('keypress', logKey);


const key = document.getElementById('key');

function logKey(e) {
    'use strict';
    key.textContent += ` ${e.code}`;
}

document.addEventListener('keypress', logKey);

