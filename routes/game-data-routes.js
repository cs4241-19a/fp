const express = require("express");
const gameDataRouter = express.Router();

const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

/**
 * Take in data from a game and store it in the database.
 * @author: jk
 */
gameDataRouter.post("/:gameId", function(req, res) {
    // TODO: write this to take in game id's
    console.log("Game data submitted");
    console.log(req.params.gameId);
    console.log(req.body);
});





module.exports = gameDataRouter;
