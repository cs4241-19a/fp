//renders the components for the login page

import React from "react";
import ReactDOM from "react-dom";
import ProfileApp from "./profileApp";
import Toast from "./show-toast";
import * as dat from 'dat.gui'
import {audioGraph, audioInit, getCanvas} from "./setUpModule";
import {visualizer} from "./visualizerModule";

let gui = new dat.GUI;

let currColor = 0

const blue = function () {
    currColor = 0
}

const green = function () {
    currColor = 1
}

const pink = function () {
    currColor = 2
}

const red = function () {
    currColor = 3
}

const changeParam = new function () {
    this.barHeight = 1
    this.barWidth = 4
    this.barFit = 2
    this.canvasClr = '#000000'
}()

const songChange = function(e) {
    e.preventDefault();

    console.log('paper has been clicked');

    let song = document.getElementById("songTest").value;

    //document.getElementById("songTest").onchange = songChange

    console.log("yuuuuuuuu")
    const canvas = getCanvas()

    const jsonAudioInit = audioInit(canvas)
    const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

    jsonAudioInit.audioElement.src = 'music/shelter.mp3'

    switch (song) {
        case 'Back in Black (AC/DC)':
            jsonAudioInit.audioElement.src = 'music/acdc.mp3'
            break;
        case 'Deutschland (Rammstein)':
            jsonAudioInit.audioElement.src = 'music/deutschland.mp3'
            break;
        case 'Bangarang (Skrillex)':
            jsonAudioInit.audioElement.src = 'music/dubstep.mp3'
            break;
        case 'Exploder (Audioslave)':
            jsonAudioInit.audioElement.src = 'music/exploder.mp3'
            break;
        case 'Divenire (Ludovico Einaudi)':
            jsonAudioInit.audioElement.src = 'music/inst.mp3'
            break;
        case 'Shelter (Porter Robinson)':
            jsonAudioInit.audioElement.src = 'music/shelter.mp3'
            break;
    }

    jsonAudioInit.audioElement.controls = true;
    jsonAudioInit.audioElement.play()

    const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

    const draw = function () {
        window.requestAnimationFrame(draw)
        visualizer(canvas, jsonAudioInit, jsonAudioGraph, results, currColor, changeParam.barHeight, changeParam.barWidth, changeParam.barFit, changeParam.canvasClr)
    }
    draw()
}

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
    document.getElementById("shareBtn").onclick = home
    document.getElementById("songTest").onchange = songChange

    gui.add(changeParam, 'barHeight', 0, 3).name('Bar Height')
    gui.add(changeParam, 'barWidth', 0, 6).name('Bar Width')
    gui.add(changeParam, 'barFit', 0.5, 5).name('Visualizer Fit')
    gui.addColor(changeParam, 'canvasClr').name('Canvas Color')
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