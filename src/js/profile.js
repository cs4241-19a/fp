//renders the components for the login page

import React from "react";
import ReactDOM from "react-dom";
import ProfileApp from "./profileApp";
import Toast from "./show-toast";

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
                document.getElementById("myName").innerText = JSON.stringify(response[i].firstName).replace(/^"(.*)"$/, '$1') + " " +
                    JSON.stringify(response[i].lastName).replace(/^"(.*)"$/, '$1');
                document.getElementById("myUName").innerText = "Username: " + JSON.stringify(response[i].username).replace(/^"(.*)"$/, '$1');
                break;
            }
        }
    })
    document.getElementById("homeGo").onclick = home
    document.getElementById("logoutBtn").onclick = logout
    document.getElementById("profileGo").onclick = myProfile
    document.getElementById("updatePassBtn").onclick = updatePass
}

function updatePass(e) {
    e.preventDefault();

    const oldPass = document.querySelector( '#oldPassword'),
        newPass = document.querySelector( '#newPassword');

    let form = document.getElementById("formPass");

    fetch( '/receive')
        .then( function( response ) {
            return response.json();
        }).then(function (response) {
        window.localStorage;
        let user = localStorage.getItem('currUser');
        console.log(user);
        let i;
        for(i = 0; i < Object.keys(response).length; i++) {
            if(response[i].username === user) {
                console.log(response[i].password)
                if(response[i].password === oldPass.value) {
                    let json = {username: user, password: newPass.value}
                    let body = JSON.stringify(json);
                    console.log(body)
                    fetch('/changePass', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body
                    })
                        .then(function(res) {
                            form.reset();  // Reset
                            Toast ({
                                str: "Password Updated",
                                time: 2000,
                                position: 'bottom'
                            });
                            console.log( "post response: ", res )
                        })
                } else {
                    form.reset();
                    Toast ({
                        str: "Old Password Incorrect",
                        time: 2000,
                        position: 'bottom'
                    });
                }
                break;
            }
        }
    })
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

ReactDOM.render(<ProfileApp />, document.getElementById("root"));