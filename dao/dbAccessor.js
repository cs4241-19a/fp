// Server stuff sorry IDK what I'm doing

//database
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./dao/db.json')
const db = lowdb(adapter);

// results
const GameResultList = require('./GameResultList').GameResultList;

class DbAccessor {
    _db;
    gameResultList;

    /**
     *
     */
    constructor() {
        this._db = db;
        this.gameResultList = GameResultList;
    }

    // set up game results
    static listGameResults() {
        //console.log(db.get('games').value())
        return db.get('games').value();
    }

    // add new result
    static addNewGameResult(result) {
        console.log(result);
        console.log("stringify: " + JSON.stringify(result))
        let p1 = result.player1;
        let p1Pieces = result.p1Pieces;
        let p2 = result.player2;
        let p2Pieces = result.p2Pieces;
        let gameResult = result.result

        let p1Setup = {name: p1, pieces: p1Pieces};
        let p2Setup = {name: p2, pieces: p2Pieces};

        let newResult = {
            player1: p1Setup,
            player2: p2Setup,
            result: gameResult
        }

        return db.get('games').push(newResult).write();
    }


}

exports.DbAccessor = DbAccessor;

