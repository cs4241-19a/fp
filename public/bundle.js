(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

},{}],2:[function(require,module,exports){
"use strict";

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
var key = document.getElementById('key');

function logKey(e) {
  'use strict';

  key.textContent += " ".concat(e.code);
}

document.addEventListener('keypress', logKey);

},{}]},{},[1,2]);
