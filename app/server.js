const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const server = require("http").createServer(app);
const fs = require("fs");
const session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
  }),
  sharedsession = require("express-socket.io-session");
const socketio = require("socket.io");
const io = socketio.listen(server);
const RED = "#ff6666";
const BLU = "#4d79ff";
io.use(sharedsession(session));

app.use(logger("dev"));
app.use(session);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.applyPort = function(port) {
  server.listen(port);
  let message = "listening on port: " + port;
  console.log(message);
};
app.applyPort(8080);

module.exports = app;

///connections and usages
var clientList = [];
var boardState = [];
let hints = [];
let roleState = {
  bspymaster: "",
  rspymaster: "",
  bdetective: "",
  rdetective: "",
};

let currentTurn = null;
let guessesRemaining = 0;

function turnAfter(role) {
  switch (role) {
    case "bdetective":
      return "rspymaster";
    case "rspymaster":
      return "rdetective";
    case "rdetective":
      return "bspymaster";
    case "bspymaster":
      return "bdetective";
  }
}

function updateAll() {
  sendBoardUpdate();
  sendClueUpdate();
}

function sendRoleState() {
  io.sockets.emit("updateRoleState", roleState);
}

function sendBoardUpdate() {
  let redLeft = boardState.filter((card) => card.revealedColor !== card.borderColor && card.borderColor === RED).length;
  let bluLeft = boardState.filter((card) => card.revealedColor !== card.borderColor && card.borderColor === BLU).length;
  let detectivelist = boardState.map(card => {
    return {
      word: card.word,
      borderColor: card.revealedColor,
      revealedColor: card.revealedColor,
    };
  });
  clientList.forEach(c => {
    if (c.role.endsWith("spymaster")) {
      io.to(c.connection).emit("updateBoardState", boardState, redLeft, bluLeft);
    } else {
      io.to(c.connection).emit("updateBoardState", detectivelist, redLeft, bluLeft);
    }
  });
}

function sendClueUpdate() {
  //io.sockets.emit("updateCluestate", clueLog);
}

function isTurn(id) {
  console.log("Current Turn", currentTurn);
  clientList.forEach((c) => {
    if (c.connection === id) {
      console.log(c.role, currentTurn, c.role === currentTurn);
      return c.role === currentTurn;
    }
  });
}

function nextTurn() {
  console.log("before", currentTurn);
  currentTurn = turnAfter(currentTurn);
  console.log("after", currentTurn);
  clientList.forEach(function(cli) {
    if (cli.role === currentTurn) {
      io.to(cli.connection).emit("your turn");
    } else {
      io.to(cli.connection).emit("lockup", getClient(currentTurn));
    }
  });
}

io.on("connect", function(client) {
  console.log("establishing connection with", client.id);
  console.log("all clients", clientList);
  client.send(client.id);
});

io.on("connection", function(socket) {
  socket.on("disableOthers", function() {
    console.log("clicked disable");
    socket.broadcast.emit(
      "specMsg",
      "only for " + socket.handshake.session.userdata,
    );

    //io.sockets.to(getSocketFromClient(socket.handshake.session.userdata)).emit("specMsg", 'only for ' + socket.handshake.session.userdata);
  });

  socket.on("setInitState", function(state, browserCache, playerOne) {
    console.log("session for: ", browserCache, "socket", socket.id);
    let user = browserCache.user;
    let found = false;
    clientList.forEach(function(element) {
      if (element.name && element.name === user) {
        console.log(
          "updating " + user + " connection from ",
          element.connection,
          "to",
          socket.id,
        );
        element.connection = socket.id;
        //io.sockets.emit("displayUser", user);
        found = true;
      }
    });
    if (!found) {
      console.log("adding client", user, "with socket", socket.id);
      clientList.push({name: user, connection: socket.id, role: "none"});
      //io.sockets.emit("displayUser", "New User");
    }

    //The first user that connects sets the base cards
    if (boardState.length < 1) {
      console.log("state set to", state, playerOne);
      boardState = state;
      currentTurn = playerOne;
      console.log("Starting turn: ", currentTurn);
    } else {
      sendRoleState();
    }
  });

  socket.on("button selected", function(state) {
    boardState = state;
    //io.sockets.emit("update hints", full_msg, msg);
    //socket.broadcast.emit("update hints", full_msg, msg);
    sendBoardUpdate();
  });

  socket.on("clue sent", function(clue) {
    //clueLog.push(clue);
    sendClueUpdate();
  });

  socket.on("hintSubmission", (sender, clue, amt) => {
    hints.push({sender: sender, clue: clue, amt: amt});
    io.sockets.emit("hintHistory", hints);
    if (amt !== 0) {
      guessesRemaining = amt + 1;
    } else {
      nextTurn();
    }
    nextTurn();

  });

  socket.on("send hint", function(msg) {
    socket.handshake.session.userdata = msg;
    clientList.push({name: msg, connection: socket.id});
    socket.handshake.session.save();

    let full_msg = "[ " + getCurrentDate() + " ]: " + msg;
    //io.sockets.emit("update hints", full_msg, msg);
    socket.broadcast.emit("update hints", full_msg, msg);
  });

  socket.on("roleSelection", function(role, name) {
    console.log("JUST SELECTED ROLE", role);

    setRoleAndName(socket.id, role, name);

    greyRole(role);
  });

  socket.on("guessed", word => {
    if (isTurn(socket.id)) {
      console.log("out of order");
    }
    console.log(word);
    boardState.forEach(card => {
      if (card.word === word) {
        card.revealedColor = card.borderColor;
        if (currentTurn.startsWith("r") && card.borderColor === RED) {
          guessesRemaining--;
        } else if (currentTurn.startsWith("b") && card.borderColor === BLU) {
          guessesRemaining--;
        } else {
          guessesRemaining = 0;
        }
        if (guessesRemaining === 0) {
          nextTurn();
        }
      }
    });
    sendBoardUpdate();
  });

  socket.on("allSelected", function() {
    let allSel =
      roleState["bdetective"] &&
      roleState["rdetective"] &&
      roleState["bspymaster"] &&
      roleState["rspymaster"];
    io.sockets.emit("allSelectedStatus", allSel);
  });

  socket.on("startGame", function() {
    sendBoardUpdate();
    socket.broadcast.emit("closeModal");
    clientList.forEach(c => {
      if (c.role === currentTurn) {
        console.log("your turn: " + c.role);
        io.to(c.connection).emit("your turn");
      }
    });
    //logic to start the game
  });

  socket.on("resetRoles", () => {
    roleState = {
      bspymaster: "",
      rspymaster: "",
      bdetective: "",
      rdetective: "",
    };
    io.sockets.emit("resetRoles");
  });

  socket.on("nextTurn", nextTurn);

});

function greyRole(role) {
  console.log("Sending greyRole");
  io.sockets.emit("greyRole", role);
}

function setRoleAndName(socketID, role, name) {
  clientList.forEach(function(cl) {
    if (cl.connection === socketID) {
      cl.role = role;
      cl.name = name;
      roleState[role] = socketID;
    }
  });
}

function getClient(role) {
  clientList.forEach(function(element) {
    if (element.role === role) {
      return element;
    }
  });
}

function getCurrentDate() {
  let currentDate = new Date();
  let day = (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate();
  let month =
    (currentDate.getMonth() + 1 < 10 ? "0" : "") +
    (currentDate.getMonth() + 1);
  let year = currentDate.getFullYear();
  let hour = (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours();
  let minute =
    (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes();
  let second =
    (currentDate.getSeconds() < 10 ? "0" : "") + currentDate.getSeconds();
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
}
