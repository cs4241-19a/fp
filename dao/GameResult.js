class GameResult {
    recency;
    player1;
    player2;
    result;

    /**
     * Create new game result
     * @param {int} recency
     * @param {Player} player1
     * @param {Player} player 2
     * @param {int} result
     */
    constructor(player1, player2, result) {
        this.recency = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.result = result;
    }

    updateRecency(gameResult) {
        this.recency++;
    }

}

exports.GameResult = GameResult;

