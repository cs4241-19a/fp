//renders the components for the main page including feed and vis

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

window.onload = function () {
    fetch( '/receive')
        .then( function( response ) {
            return response.json();
        }).then(function (response) {
            window.localStorage;
            let user = localStorage.getItem('currUser');
            console.log(user)
            for(let i = 0; i < Object.keys(response).length; i++) {
                if(response[i].username === user) {
                    document.getElementById("nameCurr").innerText = JSON.stringify(response[i].firstName).replace(/^"(.*)"$/, '$1');
                    break;
                }
            }
        })
    document.getElementById("homeGo").onclick = home
    document.getElementById("logoutBtn").onclick = logout
    document.getElementById("profileGo").onclick = myProfile
}

function home(e) {
    e.preventDefault();
    window.location = "/main.html"
}

function myProfile(e) {
    e.preventDefault();
    window.location = "/profile.html"
}

function logout(e) {
    e.preventDefault();
    window.location = "/login.html"
}