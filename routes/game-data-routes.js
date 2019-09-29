const express = require("express");
const gameDataRouter = express.Router();

const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

gameDataRouter.post("/", function(req, res) {
    // TODO: write this to take in game id's
    console.log("Game data submitted");
    console.log(req.body);
});





module.exports = gameDataRouter;
