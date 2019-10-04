const express = require("express");
const gameDataRouter = express.Router();
const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

/**
 * Create a score document in the score subcollection given of the game.
 * @param gameId The id of the game the score is for.
 * @param score The score.
 * @param userId The uid of the player.
 * @returns {Promise<FirebaseFirestore.DocumentReference>} The score document that was just created.
 */
function addScoreDefault(gameId, score, userId) {
    return db.collection("games").doc(gameId).collection('scores').add({
        score,
        user: "users/" + userId,
        timestamp: firebaseAdmin.firestore.Timestamp.now(),
    })
        .then(function(docRef) {
            // increment timesPlayed on parent
            db.collection("games").doc(gameId).update({
                timesPlayed: firebaseAdmin.firestore.FieldValue.increment(1)
            })
                .then(function() {
                    // console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    console.error("Error updating document: ", error);
                });
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
