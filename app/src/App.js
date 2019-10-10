import React from "react";
import Modal from "react-modal";
import "./App.css";

import socketIOClient from "socket.io-client";

const socket = socketIOClient("localhost:8080");
//would normally come from database but this is for testing
//list of ALL words
let allReady = false;
let allWords = [
  "wall",
  "back",
  "orange",
  "crash",
  "hawk",
  "kiwi",
  "lab",
  "ice cream",
  "india",
  "theater",
  "plane",
  "parachute",
  "telescope",
  "match",
  "police",
  "post",
  "ray",
  "kid",
  "wind",
  "box",
  "knife",
  "church",
  "bell",
  "lemon",
  "triangle",
  "cap",
  "jam",
  "organ",
  "engine",
  "agent",
  "buck",
  "day",
  "doctor",
  "ball"
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Codenames</h1>
      </header>
      <Menu />
      <Game />
    </div>
  );
}

Modal.setAppElement("#root");

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: this.props.words,
      teams: this.props.teams
    };
  }

  render() {
    return (
      <div>
        <Info />
      </div>
    );
  }
}

class Info extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <button className="modalButton" onClick={this.openModal}>
          How to Play
        </button>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.closeModal}>
                &times;
              </span>
              <br />
              <br />
              <div className="modal-header">
                <div>How to Play:</div>
                <br />
              </div>
              <div className="modal-body">
                <p>
                  On the board there are 25 tiles, each of which have the
                  codename of different secret agent. Each agent is either a
                  blue team agent, red team agent, a civilian, or the assassin.
                  The game is played with two teams, a red team and a blue team.
                  Both teams have one spymaster and one detective.
                  <br />
                  <br />
                  At the beginning of the game, only the spymasters can see the
                  position of the agents (displayed by the border of the cards).
                  The spymasters will each take turns giving clues to their
                  team's detective on which agents belong to their team. These
                  clues will include a one word hint and the amount of agents
                  that the hint relates to. The detective will then guess which
                  word the clue relates to by clicking on a codename tile. If
                  the detective guesses correctly then they will be able to
                  continue guessing until they have guessed the amount specified
                  by the spymaster. If the detective's guesses are all correct,
                  they will get a free guess which they can choose to make or
                  pass. If the detective guesses incorrectly it becomes the
                  other teams turn. If any detective guesses the assassin then
                  their team atomatically loses the game.
                  <br />
                  <br />A team wins the game if their detective can find all of
                  their team's agents or if the other team accidentally finds
                  the assassin. Good Luck!
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.changeStyle = this.changeStyle.bind(this);
    let cardColor = "tan";
    if (this.props.team === "teamA") {
      cardColor = "red";
    } else if (this.props.team === "teamB") {
      cardColor = "blue";
    } else if (this.props.team === "assassin") {
      cardColor = "black";
    }
    if (this.props.keyboard === true) {
      this.state = { color: cardColor, cardColor: cardColor };
    } else {
      this.state = { color: null, cardColor: cardColor };
    }
  }

  changeStyle(color) {
    this.setState({
      color: this.state.cardColor
    });
  }

  render() {
    return (
      <button
        className="button card"
        style={{ backgroundColor: this.state.color }}
        onClick={() => clickGuessButton(this)}
      >
        {this.props.value}
      </button>
    );
  }
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: this.props.team,
      wordsLeft: props.wordsLeft,
      log: [],
      clue: ""
    };
    socket.on("hintHistory", hints => {
      console.log(hints);
      this.setState({ log: hints });
    });
  }

  submitHint(amount) {
    if (this.state.clue === "") {
      return;
    }
    socket.emit("hintSubmission", this.state.team, this.state.clue, amount);
  }

  createAmounts() {
    let table = [];
    for (let i = 0; i < 10; i++) {
      table.push(
        <div
          key={i}
          onClick={() => this.submitHint(i)}
          className={"amount" + (i <= this.state.wordsLeft ? "" : " disabled")}
        >
          {i}
        </div>
      );
    }
    return table;
  }

  render() {
    return (
      <div className="chat">
        <div className="chat-container">
          {this.state.log.map(hint => {
            return (
              <div
                key={hint.clue + hint.amt}
                className="clue"
                style={{ color: hint.sender }}
              >
                {hint.clue} : {hint.amt}
              </div>
            );
          })}
          <div className={"hintSubmission"}>
            <input
              placeholder="Clue"
              onChange={e => this.setState({ clue: e.target.value })}
              id="msg"
            />
            <div className={"amountInput"}>{this.createAmounts()}</div>
          </div>
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: this.props.words,
      teams: this.props.teams,
      keyboard: this.props.keyboard
    };
  }

  renderCard(i) {
    return (
      <Card
        value={this.state.words[i]}
        team={this.state.teams[i]}
        keyboard={this.state.keyboard}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
          {this.renderCard(4)}
        </div>
        <div className="board-row">
          {this.renderCard(5)}
          {this.renderCard(6)}
          {this.renderCard(7)}
          {this.renderCard(8)}
          {this.renderCard(9)}
        </div>
        <div className="board-row">
          {this.renderCard(10)}
          {this.renderCard(11)}
          {this.renderCard(12)}
          {this.renderCard(13)}
          {this.renderCard(14)}
        </div>
        <div className="board-row">
          {this.renderCard(15)}
          {this.renderCard(16)}
          {this.renderCard(17)}
          {this.renderCard(18)}
          {this.renderCard(19)}
        </div>
        <div className="board-row">
          {this.renderCard(20)}
          {this.renderCard(21)}
          {this.renderCard(22)}
          {this.renderCard(23)}
          {this.renderCard(24)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    let firstteam = Math.floor(Math.random() * 2);
    let ingame = setBoard(firstteam);
    let ingameCards = ingame[0];
    let ingameTeams = ingame[1];

    this.state = {
      boardWords: ingameCards,
      boardTeams: ingameTeams,
      firstteam: firstteam
    };
  }

  render() {
    let status;
    let order = this.state.firstteam;
    if (!order) {
      status = "Red";
    } else {
      status = "Blue";
    }
    return (
      <div className="game">
        <Board
          words={this.state.boardWords}
          teams={this.state.boardTeams}
          keyboard={false}
        />
        <Chat team={status} wordsLeft={9} />

        <Modals words={this.state.boardWords} teams={this.state.boardTeams} />
        <br />
        <br />
      </div>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: true,
      addGame: false,
      selectedRole: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="codenames">
        <div className="modal-menu">
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={{ content: { backgroundColor: "#282c34", padding: 0 } }}
          >
            <div id="myModal" className="modal">
              <div className="modal-content">
                <div className="modal-header-menu">
                  <div>Codenames</div>
                </div>
                <div className="modal-body-menu">
                  <input
                    placeholder="Username"
                    id="menuName"
                    autoComplete="off"
                  ></input>
                  <br />
                  <br />
                  <img
                    className="center"
                    src="detective.png"
                    alt="Trulli"
                    width="270"
                    height="333"
                  ></img>
                  <br />
                  <br />
                  <button
                    className="redrole"
                    id="rspymaster"
                    onClick={() => makeGray("rspymaster", this)}
                  >
                    Red Team Spymaster
                  </button>
                  <button
                    className="bluerole"
                    id="bspymaster"
                    onClick={() => makeGray("bspymaster", this)}
                  >
                    Blue Team Spymaster
                  </button>
                  <br />
                  <button
                    className="redrole"
                    id="rdetective"
                    onClick={() => makeGray("rdetective", this)}
                  >
                    Red Team Detective
                  </button>
                  <button
                    className="bluerole"
                    id="bdetective"
                    onClick={() => makeGray("bdetective", this)}
                  >
                    Blue Team Detective
                  </button>
                  <br />
                  <br />
                  <button id = "playBtn" className="play" onClick={() => closeMenu(this)}>
                    Play
                  </button>
                  <button className="play" onClick={() => resetMenu(this)}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

function makeGray(btn, selected) {
  /*let last = document.getElementById(selected.state.selectedRole);
  console.log(last);
  if (last !== null) {
    last.disabled = false;
    last.style.borderColor = "black";
    if (last.className === "redrole") {
      last.style.backgroundColor = "#ff6666";
    } else {
      last.style.backgroundColor = "#4d79ff";
    }
  }*/

  var redspy = document.getElementById("rspymaster");
  var reddet = document.getElementById("rdetective");
  var bluespy = document.getElementById("bspymaster");
  var bluedet = document.getElementById("bdetective");
  bluespy.disabled = true;
  redspy.disabled = true;
  reddet.disabled = true;
  bluedet.disabled = true;

  let b = document.getElementById(btn);
  b.style.backgroundColor = "gray";
  b.style.borderColor = "gold";
  selected.state.selectedRole = btn;
  socket.emit("roleSelection", selected.state.selectedRole);
}



function resetMenu(play) {
  var redspy = document.getElementById("rspymaster");
  var reddet = document.getElementById("rdetective");
  var bluespy = document.getElementById("bspymaster");
  var bluedet = document.getElementById("bdetective");
  redspy.style.backgroundColor = "#ff6666";
  redspy.style.borderColor = "black";
  redspy.disabled = false;
  bluespy.style.backgroundColor = "#4d79ff";
  bluespy.style.borderColor = "black";
  bluespy.disabled = false;
  reddet.style.backgroundColor = "#ff6666";
  reddet.style.borderColor = "black";
  reddet.disabled = false;
  bluedet.style.backgroundColor = "#4d79ff";
  bluedet.style.borderColor = "black";
  bluedet.disabled = false;
}

function closeMenu(play) {
  var u = document.getElementById("menuName");
  var redspy = document.getElementById("rspymaster");
  var reddet = document.getElementById("rdetective");
  var bluespy = document.getElementById("bspymaster");
  var bluedet = document.getElementById("bdetective");
  var username = u.value;
  console.log(username);
  if (allReady) {
    play.closeModal();
    socket.emit("startGame");
  }

}

//takes full list of words and picks 25 unique for a game
function setBoard(order) {
  let boardWords = Array(25).fill(null);
  let boardTeams = Array(25).fill(null);

  //for setting board words
  for (let i = 0; i < 25; i++) {
    let useCheck = false;
    let counter = Math.floor(Math.random() * allWords.length);
    for (let j = 0; j < boardWords.length; j++) {
      if (boardWords[j] === allWords[counter]) {
        useCheck = true;
      }
    }
    if (useCheck === false) {
      boardWords[i] = allWords[counter];
    } else {
      i--;
    }
  }

  //for words to teams
  setTeam("teamA", order);
  setTeam("teamB", order);
  setTeam("assassin", order);
  setTeam("citizen", order);

  function setTeam(type, order) {
    let amount = 7;
    if (type === "assassin") {
      amount = 1;
    }
    if (
      (order === 0 && type === "teamA") ||
      (order === 1 && type === "teamB")
    ) {
      amount += 2;
    } else if (
      (order === 1 && type === "teamA") ||
      (order === 0 && type === "teamB")
    ) {
      amount++;
    }
    for (let j = 0; j < amount; j++) {
      let counter = Math.floor(Math.random() * 25);
      if (boardTeams[counter] == null) {
        boardTeams[counter] = type;
      } else {
        j--;
      }
    }
  }

  return [boardWords, boardTeams];
}

//send out message to set initial state if it hasnt already
window.onload = function() {
  console.log('the sessionstorage: ', sessionStorage.getItem("userInfo"));
  socket.emit("setInitState", getBoardState(), getBrowserData());
};

function getBrowserData() {
  return { user: sessionStorage.getItem("userInfo")  || 'USER'};
}

function clickHint(hintbtn) {
  setTimeout(function() {
    let newHint = document.getElementById("msg").value;
    let state = getClueState(newHint);
    console.log("hint clicked");
    socket.emit("clue sent", state);
  }, 1);
}

function clickGuessButton(btn) {
  btn.changeStyle(btn.props.team);
  setTimeout(function() {
    let state = getBoardState();
    console.log("button clicked");
    socket.emit("button selected", state);
  }, 1);
}

function getBoardState() {
  let cards = [];
  let collectedCards = document.getElementsByClassName("card");
  const NUM_CARDS_ROW = 5;
  for (let i = 0; i < NUM_CARDS_ROW; i++) {
    cards[i] = [];
    for (let j = 0; j < NUM_CARDS_ROW; j++) {
      let selCard = collectedCards[i * NUM_CARDS_ROW + j];
      cards[i][j] = {
        word: selCard.innerHTML,
        color: selCard.style.backgroundColor
      };
    }
  }
  console.log(cards);
  return cards;
}

function getClueState(newHint) {
  let chatCont = document.getElementsByClassName("chat-container")[0];
  let chats = chatCont.getElementsByTagName("p");
  let chatText = [];
  for (let i = 0; i < chats.length; i++) {
    chatText.push(chats[i].innerHTML);
  }
  if (newHint) {
    chatText.push(newHint);
  }
  return chatText;
}

socket.on("updateCluestate", function(cs) {
  let chatCont = document.getElementsByClassName("chat-container")[0];
  //chatCont.innerHTML = '';
  cs.forEach(function(msg) {
    let final_message = document.createElement("p");
    console.log(msg);
    final_message.innerHTML = msg;
    console.log(final_message);
    chatCont.append(final_message);
  });
});

socket.on("updateBoardstate", function(bs) {
  console.log("updating board state", bs);
  if (bs.length < 1) {
    return;
  }
  let rows = document.getElementsByClassName("board-row");
  for (let i = 0; i < rows.length; i++) {
    let cardsInRow = rows[i].getElementsByClassName("card");
    for (let j = 0; j < cardsInRow.length; j++) {
      let button = cardsInRow[j];
      console.log(bs[i][j]);
      button.innerHTML = bs[i][j].word;
      button.style.backgroundColor = bs[i][j].color;
    }
  }
  console.log('number clicked');
  //socket.emit('send hint', 'sent!');
});

socket.on("update hints", function(msg) {
  let final_message = document.createElement("p");
  console.log(msg);
  final_message.innerHTML = msg;
  console.log(final_message);
  document.getElementsByClassName("chat-container")[0].append(final_message);
});

socket.on('greyRole', function(role){
  console.log('greying role', role);
  let button  = document.getElementById(role);
  button.style.backgroundColor = "grey";
  button.disabled = true;
  socket.emit("allSelected");
});

socket.on("allSelectedStatus", function(status){
   console.log('status', status);
   if(status){
       allReady = true;
   }
});

socket.on("updateRoleState", function(rs){
  for(let role in rs){
    if(rs.hasOwnProperty(role) && rs[role]){
      console.log('greying role', role);
      let button  = document.getElementById(role);
      button.style.backgroundColor = "grey";
      button.disabled = true;
    }
  }

});

socket.on("closeModal", ()=>{
    //document.getElementById("playBtn").click();
});



export default App;
