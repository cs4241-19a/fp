var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
var session = require("express-session")({
        secret: "my-secret",
        resave: true,
        saveUninitialized: true
    }),
    sharedsession = require("express-socket.io-session");
var socketio = require('socket.io');
var io = socketio.listen(server);
io.use(sharedsession(session));

app.use(logger('dev'));
app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.applyPort = function(port){
    server.listen(port);
    let message = "listening on port: " + port;
    console.log(message);
};
app.applyPort(8080);

module.exports = app;

///connections and usages
var clientList = [];
var boardState = [];
var clueLog = [];

function updateAll(){
    sendBoardUpdate();
    sendClueUpdate();
}

function sendBoardUpdate(){
    io.sockets.emit("updateBoardstate", boardState);
}
function sendClueUpdate(){
    io.sockets.emit("updateCluestate", clueLog);
}


io.on("connect", function(client){
    console.log("establishing connection with", client.id);
    console.log("all clients", clientList);
    client.send(client.id);
});

io.on("connection", function(socket) {

    socket.on("disableOthers", function(){
        console.log('clicked disable');
        socket.broadcast.emit("specMsg", 'only for ' + socket.handshake.session.userdata);

        //io.sockets.to(getSocketFromClient(socket.handshake.session.userdata)).emit("specMsg", 'only for ' + socket.handshake.session.userdata);
    });

    socket.on("setInitState", function(state, browserCache){
        console.log('session for: ', browserCache, 'socket', socket.id);
        let user = browserCache.user;
        let found = false;
        clientList.forEach(function (element) {
            if (element.name && element.name === user) {
                console.log("updating " + user + " connection from ", element.connection, 'to', socket.id);
                element.connection = socket.id;
                io.sockets.emit("displayUser", user);
                found = true;
            }
        });
        if(!found){
            console.log('adding client', user, 'with socket', socket.id);
            clientList.push({name: user, connection: socket.id})
            //io.sockets.emit("displayUser", "New User");
        }

        //The first user that connects sets the base cards
       if(boardState.length<1){
           console.log('state set to', state);
           boardState = state;
       }else{
           updateAll();
           console.log('state already is ', boardState);
       }
    });

    socket.on("button selected", function(state) {
        boardState = state;
        //io.sockets.emit("update hints", full_msg, msg);
        //socket.broadcast.emit("update hints", full_msg, msg);
        sendBoardUpdate();
    });

    socket.on("clue sent", function(clue){
        clueLog.push(clue);
        sendClueUpdate();
    });

});

function getSocketFromClient(cl){
    clientList.forEach(function (element) {
        if(element.name == cl){
            console.log("GetsockFromCl", element.name, element.connection);
            return element.connection;
        }
    })
}

function getCurrentDate() {
    var currentDate = new Date();
    var day = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate();
    var month = ((currentDate.getMonth() + 1) < 10 ? '0' : '') + (currentDate.getMonth() + 1);
    var year = currentDate.getFullYear();
    var hour = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours();
    var minute = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    var second = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
