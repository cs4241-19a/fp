//import { createdAccount, setFalse, } from './global.js'
var global = require('./global.js');

window.onload = function() {
    
    console.log("created account " + createdAccount)
    if (global.createdAccount) {
        console.log("heyyyy")
        setFalse();
        document.getElementById('created').innerHTML = "Success!"
    }
    //console.log(createdAccount)
}