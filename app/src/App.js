import React from "react";
import "./App.css";

//would normally come from database but this is for testing
//list of ALL words
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
        <Game />
      </header>
    </div>
  );
}

class Card extends React.Component {
  render() {
    return (
      <button id="card" className="button">
        {this.props.value}
      </button>
    );
  }
}

class Chat extends React.Component {
  render() {
    return (
      <form id="chat">
        <input placeholder="Hint.." id="msg"></input>
        <input placeholder="Amount.." id="msg" type="number"></input>
        <button type="button" id="btn">
          Submit
        </button>
      </form>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: this.props.words
    };
  }

  renderCard(i) {
    return <Card value={this.state.words[i]} />;
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
    let ingameCards = setBoard();
    this.state = {
      boardWords: ingameCards
    };
  }

  render() {
    return (
      <div className="game">
        <h1>Codenames</h1>
        <div className="game-board">
          <Board words={this.state.boardWords} />
        </div>
        <div className="chat">
          <Chat />
        </div>
      </div>
    );
  }
}

//takes full list of words and picks 25 unique for a game
function setBoard() {
  let boardWords = Array(25).fill(null);
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
  return boardWords;
}

export default App;
