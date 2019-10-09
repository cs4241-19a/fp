const GameResult = require('./GameResult');

class GameResultList{
    results;

    /**
     * Create a new game result list
     */
    constructor(){
        this.results = {};
    }

    /**
     * Add game result to list
     * @return
     */
    addGameResult(request) {
        let body = request.body;
        let gameResult = new GameResult(body.player1, body.player2, body.result);
        this.results.add(gameResult);
    }

    /**
     * getter
     * @returns {Array[GameResult]}
     */
    getGameResult() {
        return this.results;
    }

}

exports.GameResultList = GameResultList;