const express = require("express");
const gameDataRouter = express.Router();

const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

function addScoreDefault(gameId, score, userId) {
    const scoreDoc = db.collection("games").doc(gameId).collection('scores').add({
        score,
        user: "users/" + userId,
        timestamp: firebaseAdmin.firestore.Timestamp.now(),
    })
        .then(function(docRef) {
            // console.log("Document written with ID: ", docRef.id);
            return docRef;
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

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
        addScoreDefault(req.params.gameId, data.score, data.userId);
        res.json({});
    } else {
        res.json({error: "missing user"});
    }
});


module.exports = gameDataRouter;
