const pull = require("./src/pullData");
const push = require("./src/pushData");

const express = require("express");
const gameDataRouter = express.Router();

/**
 * Take in data from a game and store it in the database.
 * @author: jk
 */
gameDataRouter.post("/:gameId", function(req, res) {
    const data = req.body;
    console.log("Game data submitted");
    console.log(req.params.gameId);
    console.log(data);
    if (data.userId) {
        push.addScoreDefault(req.params.gameId, data.score, data.userId);
        res.json({});
    } else {
        res.json({error: "missing user"});
    }
});

/**
 * Send back json of all scores.
 * @author: jk
 */
gameDataRouter.post("/:gameId/scores", async function(req, res) {
    const data = req.body;
    console.log("Getting score data");
    console.log(req.params.gameId);
    console.log(data);
    res.json(await pull.getGameScores(req.params.gameId, data.orderDir));
});

module.exports = gameDataRouter;
