import { createdAccount, setFalse } from './global.js'
var created = require()

window.onload = function() {
    console.log(createdAccount)
    if (createdAccount) {
        console.log("heyyyy")
        setFalse();
        document.getElementById('created').innerHTML = "Success!"
    }
    //console.log(createdAccount)
}