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

io.on("connect", function(client){
    //clients.push(client);
    console.log(client.id);
    console.log("all clients", clientList);
    client.send(client.id);
    // client.on('disconnect', function() {
    //     clients.splice(clients.indexOf(client), 1);
    // });
});

io.on("connection", function(socket) {
    let ud = socket.handshake.session.userdata;
    let user = "";
    console.log('session for: ', socket.handshake.session.userdata);
    if(ud) {
        clientList.forEach(function (element) {
            console.log('client found! : ', element.name, 'with size', clientList.length);
            if (element.name && element.name == socket.handshake.session.userdata) {
                user = element.name;
                element.connection = socket.id;
                io.sockets.emit("displayUser", user);
            }
        });
    }else {
        io.sockets.emit("displayUser", "New User");
    }

    socket.on("disableOthers", function(){
        console.log('clicked disable');
        socket.broadcast.emit("specMsg", 'only for ' + socket.handshake.session.userdata);

        //io.sockets.to(getSocketFromClient(socket.handshake.session.userdata)).emit("specMsg", 'only for ' + socket.handshake.session.userdata);
    });

    socket.on("send hint", function(msg) {
        socket.handshake.session.userdata = msg;
        clientList.push({name: msg, connection: socket.id});
        socket.handshake.session.save();

        let full_msg = "[ " + getCurrentDate() + " ]: " + msg;
        //io.sockets.emit("update hints", full_msg, msg);
        socket.broadcast.emit("update hints", full_msg, msg);
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
