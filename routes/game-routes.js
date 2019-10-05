const pull = require("./src/pullGameData");
const express = require("express");
const gameRouter = express.Router();

const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

/**
 * Load the game object from the database to get it's path. Then render the game page
 * @author: jk
 */
gameRouter.get("/:gameId", async function(req, res) {
    const gameData = await pull.getGames();
    const dropdownData = pull.getGameDropdownData(gameData);
    const game = gameData.find(game => game.gameId === req.params.gameId);
    if (game) {
        res.render(game.path, {gameId: game.gameId, scoresGameDropdownData: dropdownData});
    } else {
        res.render("not-found", {msg: "We apologise. This game does not exist."});
    }
});


module.exports = gameRouter;
